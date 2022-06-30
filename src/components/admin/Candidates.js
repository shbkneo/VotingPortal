import {
  Button,
  Dialog,
  DialogTitle,
  Fab,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firebaseDB } from "../../services/firebase/FirebaseConfig";
import { useStyles } from "./style";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { Edit } from "@mui/icons-material";
import { async } from "@firebase/util";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalType, setModalType] = useState();
  const [newCandidateName, setNewCandidateName] = useState("");
  const classes = useStyles();

  useEffect(() => {
    fetchAllCandidates();
  }, []);
  const fetchAllCandidates = async () => {
    let temp = [];
    const candidatesDBref = collection(firebaseDB, "candidates");
    const userQuerySnapshot = await getDocs(candidatesDBref);
    userQuerySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setCandidates(temp);
  };
  const removeCandidateHandler = async (id) => {
    await deleteDoc(doc(firebaseDB, "candidates", id));

    setModalOpen(false);
    fetchAllCandidates();
  };
  const addCandidateHandler = async () => {
    const candidatesDBref = collection(firebaseDB, "candidates");

    const newDoc = await doc(candidatesDBref);
    const docRef = await setDoc(newDoc, {
      name: newCandidateName,
      email: "",
      id: newDoc.id,
    });
    setNewCandidateName("");
    fetchAllCandidates();
  };
  const editCandidateHandler = async (id) => {
    await updateDoc(doc(firebaseDB, "candidates", id), {
      name: newCandidateName,
    });
    setNewCandidateName("");
    setModalOpen(false);
    fetchAllCandidates();
  };
  console.log(modalType);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.titleHeading}>
          All Candidates ({candidates.length})
        </Typography>
        <Box
          display={"flex"}
          justifyContent="center"
          marginTop={"-15px"}
          marginBottom={"25px"}
        >
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            onClick={() => {
              setModalType("add");
              setModalOpen(true);
            }}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Grid>

      {candidates?.slice().map((el, i) => (
        <Grid
          item
          key={i}
          xs={12}
          sm={6}
          md={4}
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <div className={classes.tileBoxes}>
            <Paper className={classes.tilePaper}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography className={classes.tileName}>{el.name}</Typography>
                <Box>
                  <Edit
                    color="success"
                    onClick={() => {
                      setModalData({ ...el });
                      setModalType("edit");
                      setModalOpen(true);
                      setNewCandidateName(el?.name);
                    }}
                  />
                  <DeleteForeverIcon
                    onClick={() => {
                      setModalData({ ...el });
                      setModalType("remove");
                      setModalOpen(true);
                    }}
                    style={{ color: "#ff3300" }}
                  />
                </Box>
              </div>
              {/* <Typography className={classes.emailText}>
              {el?.email}
            </Typography> */}
            </Paper>
          </div>
        </Grid>
      ))}
      <Dialog
        open={modalOpen}
        onClose={() => {
          setNewCandidateName("");
          setModalOpen(false);
        }}
      >
        <DialogTitle>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {modalType === "remove" ? (
                <Typography align="center">
                  Remove {modalData?.name} ?
                </Typography>
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  label="Candidate Name"
                  value={newCandidateName}
                  onChange={(e) => setNewCandidateName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCandidateHandler()}
                ></TextField>
              )}
            </Grid>
            {/* <Grid item xs={12}>
              <Typography>{modalData?.email}</Typography>
            </Grid> */}

            <Grid item xs={12} justifyContent={"center"} container>
              {modalType === "remove" ? (
                <Button
                  variant={"outlined"}
                  onClick={() => removeCandidateHandler(modalData?.id)}
                >
                  Remove
                </Button>
              ) : (
                <Button
                  disabled={!newCandidateName}
                  variant={"outlined"}
                  onClick={() =>
                    modalType === "add"
                      ? addCandidateHandler()
                      : editCandidateHandler(modalData?.id)
                  }
                >
                  {modalType === "add" ? "Add" : "Done"}
                </Button>
              )}
            </Grid>
          </Grid>
        </DialogTitle>
      </Dialog>
    </Grid>
  );
};

export default Candidates;
