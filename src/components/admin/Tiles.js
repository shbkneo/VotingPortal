import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./style";
import InfoIcon from "@mui/icons-material/Info";
import { Box } from "@mui/system";
import { Colors } from "../../utils/Colors";
import moment from "moment";
import { Images } from "../../utils/Images";
const getInitials = (nameString) => {
  const fullName = nameString.split(" ");
  const firstLetter = fullName[0].charAt(0);
  const secondLetter = fullName?.[1]?.charAt(0) || "";
  return `${firstLetter.toUpperCase()}${secondLetter.toUpperCase()}`;
};
const Tiles = ({ data = {}, onClickTiles, onSubmit, ...props }) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={0}
      style={{
        overflow: "hidden",
        borderRadius: 15,

        height: "100%",
        width: "100%",

        paddingTop: 10,
        paddingBottom: 10,

        boxSizing: "border-box",
      }}
    >
      <Grid container style={{ position: "relative" }}>
        {data.champion ? (
          <Box
            style={{
              padding: 2,

              position: "absolute",
              right: 0,
            }}
          >
            <img style={{ width: 30 }} alt="" src={Images.medal}></img>
          </Box>
        ) : null}
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Avatar
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid",
              width: 60,
              height: 60,
            }}
          >
            {getInitials(data.name)}
          </Avatar>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Typography
            noWrap
            style={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {data.name}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Typography> Votes: {data.count}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              noWrap
              className={classes.detailsText}
              onClick={() => onClickTiles(data)}
            >
              Details
            </Typography>
            <InfoIcon
              style={{ fontSize: 16, color: "#01726f", marginLeft: 5 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 7 }}
          >
            {props.date === moment().format("DD-MM-YYYY") ? (
              <Button
                style={{
                  textTransform: "none",
                  color: "white",
                  backgroundColor: Colors.red,
                  borderRadius: 20,
                }}
                size="small"
                onClick={() => onSubmit(data)}
                variant="contained"
              >
                Select
              </Button>
            ) : (
              <Button
                disabled
                style={{
                  textTransform: "none",

                  borderRadius: 20,
                }}
                size="small"
                variant="contained"
              >
                Select
              </Button>
            )}
          </div>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Paper>
  );
};

export default Tiles;
