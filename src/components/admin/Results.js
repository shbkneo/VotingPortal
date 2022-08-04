import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  Typography,
  MenuItem,
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Tiles from "./Tiles";
import { firebaseDB } from "../../services/firebase/FirebaseConfig";
import DialogComponent from "./DialogComponent";
import { useStyles } from "./style";
import moment from "moment";
import { useSelector } from "react-redux";
import { Images } from "../../utils/Images";
import ModalComponent from "../voting/ModalComponent";

const Results = () => {
  const classes = useStyles();
  const { userData } = useSelector((state) => state);

  const [candidates, setCandidates] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});
  // const [fridayDate, setFridayDate] = useState();
  const [pollResults, setPollResults] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectChampionDialog, setSelectChampionDialog] = useState(false);
  const [selectChampionDialogData, setSelectChampionDialogData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalError, setModalError] = useState(false);
  useEffect(() => {
    loadResults();
  }, []);
  useEffect(() => {
    updateMembersList();
  }, [selectedDate]);

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const closeModalHandler = () => {
    updateMembersList();
    setOpenModal(false);
    setSelectChampionDialog(false);
    setSelectChampionDialogData({});
  };

  const updateMembersList = async () => {
    let results = pollResults.filter((el, i) => {
      return moment(el.date).format("DD-MM-YYYY") === selectedDate;
    });
    let temp = allMembers.map((el, i) => {
      return { ...el, count: 0, comments: [] };
    });
    for (let i of allMembers) {
      for (let j in results) {
        if (i?.name === results[j].votedFor) {
          const indexOfCandidate = temp.findIndex((el) => el.name === i.name);
          temp[indexOfCandidate].count++;
          temp[indexOfCandidate].comments = [
            ...temp[indexOfCandidate]?.comments,
            {
              commentator: results[j]?.userName,
              email: results[j]?.email,
              comment: results[j]?.reason,
            },
          ];
        }
      }
    }

    let champions = [];

    const championsDBRef = collection(firebaseDB, "champions");
    const q = query(championsDBRef, where("team_id", "==", userData.team_id));
    const userQuerySnapshotChampions = await getDocs(q);
    userQuerySnapshotChampions.forEach((doc) => {
      champions.push(doc.data());
    });
    champions = champions.filter((el, i) => {
      return moment(el?.champion_date).format("DD-MM-YYYY") == selectedDate;
    });

    let temp2 = temp.map((el, i) => {
      return { ...el, champion: el.uid == champions?.[0]?.uid };
    });

    setCandidates(temp2.slice().sort((a, b) => b.count - a.count));
  };

  const loadResults = async () => {
    let allCandidateNames = [];
    const membersDBref = collection(firebaseDB, "members");
    const membersQueue = query(
      membersDBref,
      where("team_id", "==", userData.team_id)
    );
    const userQuerySnapshotx = await getDocs(membersQueue);
    userQuerySnapshotx.forEach((doc) => {
      allCandidateNames.push(doc.data());
    });
    allCandidateNames = allCandidateNames.filter(
      (el, i) => el.team_id === userData?.team_id && el.admin == false
    );
    let results = [];
    const resultDBref = collection(firebaseDB, "results");
    const resultsQue = query(
      resultDBref,
      where("team_id", "==", userData.team_id)
    );

    const userQuerySnapshot = await getDocs(resultsQue);
    userQuerySnapshot.forEach((doc) => {
      results.push(doc.data());
    });

    setDateRange(
      results
        .map((el, i) => moment(el.date).format("DD-MM-YYYY"))
        .slice()
        .sort((a, b) => {
          return (
            moment(a, "DD.MM.YYYY").valueOf() -
            moment(b, "DD.MM.YYYY").valueOf()
          );
        })
    );

    setSelectedDate(
      moment.max(results.map((el, i) => moment(el.date))).format("DD-MM-YYYY")
    );

    setPollResults(results);
    setAllMembers(allCandidateNames);
  };
  const onClickTiles = (data) => {
    setDialogData(data);
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setDialogData({});
    setOpenDialog(false);
  };
  const openSelectChampionDialog = (data) => {
    setSelectChampionDialogData(data);
    setSelectChampionDialog(true);
  };
  const closeChampionDialog = () => {
    setSelectChampionDialogData({});
    setSelectChampionDialog(false);
  };
  const makeChampionHandler = async (data) => {
    try {
      let champions = [];

      const championsDBRef = collection(firebaseDB, "champions");
      const q = query(championsDBRef, where("team_id", "==", userData.team_id));
      const userQuerySnapshot = await getDocs(q);
      userQuerySnapshot.forEach((doc) => {
        champions.push(doc.data());
      });
      champions = champions.filter(
        (el, i) =>
          moment(el?.champion_date).format("DD-MM-YY") ===
          moment(new Date()).format("DD-MM-YY")
      );

      if (champions.length > 0) {
        await deleteDoc(doc(firebaseDB, "champions", champions[0]?.id));
      }

      const docs = await doc(championsDBRef);
      const docRef = await setDoc(docs, {
        ...data,
        id: docs.id,
        champion_date: moment(new Date()).format(),
      });
      setModalMessage("Done");
      setModalError(false);
      setOpenModal(true);
    } catch (error) {
      setModalMessage("Something went Wrong!");
      setModalError(true);
      // alert("something went wrong. Please try again later");
      setOpenModal(true);
      console.log(error);
    }
  };
  return (
    <Grid container>
      {!userData?.admin ? (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                alt=""
                src={Images.denied}
                style={{ height: 80, width: 80 }}
              ></img>
            </div>

            <h3>You don't have access to this panel !</h3>
          </div>
        </Grid>
      ) : (
        <>
          <Grid item container xs={12}>
            <Grid container item xs={12} style={{ alignItems: "center" }}>
              <Grid item xs={12}>
                <div style={{ paddingLeft: 10 }}>
                  <Typography className={classes.titleHeading}>
                    Poll Results
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} style={{ marginTop: -10, marginBottom: 25 }}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">Date</InputLabel>
                  <Select
                    style={{ backgroundColor: "white" }}
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={selectedDate}
                    label="Date"
                    onChange={handleChange}
                  >
                    {dateRange.map((el, i) => (
                      <MenuItem key={i} value={el}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ padding: "0px 10px" }}>
            <Grid container>
              {candidates.map((el, i) => (
                <Grid
                  item
                  key={i}
                  xs={6}
                  sm={4}
                  md={2}
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginBottom: 15,
                  }}
                >
                  <div
                    style={{
                      width: "90%",

                      overflow: "hidden",
                    }}
                  >
                    <Tiles
                      date={selectedDate}
                      champion={1}
                      // onSubmit={makeChampionHandler}
                      onSubmit={openSelectChampionDialog}
                      key={i}
                      data={el}
                      onClickTiles={onClickTiles}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <DialogComponent
            select
            open={selectChampionDialog}
            data={selectChampionDialogData}
            close={closeChampionDialog}
            onSubmit={makeChampionHandler}
          />
          <DialogComponent
            open={openDialog}
            data={dialogData}
            close={closeDialog}
          />
          <ModalComponent
            open={openModal}
            onClose={closeModalHandler}
            error={modalError}
            message={modalMessage}
          />
        </>
      )}
    </Grid>
  );
};

export default Results;
