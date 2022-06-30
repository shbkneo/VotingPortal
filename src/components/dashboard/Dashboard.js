import { Container, Grid, Paper, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { firebaseDB } from "../../services/firebase/FirebaseConfig";
import DialogComponent from "./DialogComponent";
import { useStyles } from "./style";
import Tiles from "./Tiles";

const Dashboard = () => {
  const classes = useStyles();

  const { userData } = useSelector((store) => store);
  const [myVotingsList, setMyVotingsList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});
  useEffect(() => {
    fetchVotingsData();
  }, []);
  const fetchVotingsData = async () => {
    let temp = [];
    const resultDBref = collection(firebaseDB, "results");
    const q = query(resultDBref, where("userId", "==", userData.uid));
    const userQuerySnapshot = await getDocs(q);
    userQuerySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setMyVotingsList(temp);
  };
  const closeDialog = () => {
    setDialogData({});
    setOpenDialog(false);
  };
  const onClickTiles = (data) => {
    setDialogData(data);
    setOpenDialog(true);
  };

  return (
    <Grid container>
      <Grid
        item
        xs={6}
        sm={4}
        md={3}
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <p className={classes.titleHeading}>Hi {userData?.name},</p>
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <p
          style={{
            marginBottom: "30px",

            textAlign: "center",
          }}
        >
          {myVotingsList.length > 0
            ? " You have voted for the following candidates:"
            : "You have not voted for any candidates yet"}
        </p>
      </Grid>
      <Grid item xs={12}></Grid>

      {myVotingsList.map((el, i) => (
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

export default Dashboard;
