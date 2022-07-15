import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => {
  return {
    titleHeading: {
      fontSize: "1.3rem !important",
      textAlign: "start",

      margin: "10px 0 25px 0 !important",
    },
    commentBox: {
      border: "1px solid ",
    },

    tileBoxes: {
      width: "80%",
      marginBottom: 10,
      cursor: "pointer",
    },
    tilePaper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 10,
    },
    tileName: {
      fontSize: "1.2rem !important",
      fontWeight: "bold !important",
      opacity: 0.9,
      textTransform: "capitalize",
      wordBreak: "break-word",
    },

    detailsText: {
      color: "#01726f",
      cursor: "pointer",
      textAlign: "center",
    },
    emailText: {
      wordBreak: "break-word",
    },
    justifyRight: {
      display: "flex",
      justifyContent: "right",
    },
  };
});
