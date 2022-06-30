import { Grid, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Tiles from "../../common/Tiles";
import { firebaseDB } from "../../services/firebase/FirebaseConfig";
import DialogComponent from "./DialogComponent";
import { useStyles } from "./style";
import moment from "moment";

const Results = () => {
  const classes = useStyles();
  const [candidates, setCandidates] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});

  useEffect(() => {
    loadResults();
  }, []);
  const loadResults = async () => {
    const t = new Date().getDate() + (6 - new Date().getDay() - 1) - 7;
    const lastFriday = new Date();
    lastFriday.setDate(t);

    let allCandidateNames = [];
    const candidatesDBref = collection(firebaseDB, "candidates");
    const userQuerySnapshotx = await getDocs(candidatesDBref);
    userQuerySnapshotx.forEach((doc) => {
      allCandidateNames.push(doc.data());
    });
    let results = [];
    const resultDBref = collection(firebaseDB, "results");
    const userQuerySnapshot = await getDocs(resultDBref);
    userQuerySnapshot.forEach((doc) => {
      results.push(doc.data());
    });

    //if today is Friday, result will contain filtered array containing elements of today's Date only
    // otherwise it will contain elements filtered as per last friday date

    if (moment(new Date()).format("dddd") === "Friday") {
      results = results.filter((el, i) => {
        return (
          moment(el.date).format("DD-MM-YYYY") ===
          moment(new Date()).format("DD-MM-YYYY")
        );
      });
    } else {
      results = results.filter((el, i) => {
        return (
          moment(el.date).format("DD-MM-YYYY") ===
          moment(lastFriday).format("DD-MM-YYYY")
        );
      });
    }
    let temp = allCandidateNames.map((el, i) => {
      return { name: el?.name, count: 0, comments: [] };
    });
    for (let i of allCandidateNames) {
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
    setCandidates(temp.slice().sort((a, b) => b.count - a.count));
  };
  const onClickTiles = (data) => {
    setDialogData(data);
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setDialogData({});
    setOpenDialog(false);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.titleHeading}>Poll Results</Typography>
        <Typography align="center" marginTop={"-15px"} marginBottom={"25px"}>
          {moment(new Date()).format("dddd") === "Friday"
            ? "(Today)"
            : "(Last Friday)"}
        </Typography>
      </Grid>

      {candidates.map((el, i) => (
        <Grid
          item
          key={i}
          xs={6}
          sm={4}
          md={3}
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <Tiles key={i} data={el} onClickTiles={onClickTiles} />
        </Grid>
      ))}
      <DialogComponent
        open={openDialog}
        data={dialogData}
        close={closeDialog}
      />
    </Grid>
  );
};

export default Results;
