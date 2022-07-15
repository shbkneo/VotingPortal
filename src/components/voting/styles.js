import { makeStyles } from "@mui/styles";
import { Colors } from "../../utils/Colors";

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    marginTop: 80,
  },
  loginText: {
    fontSize: "12rem",
    marginBottom: 20,
  },
  justifyCenter: {
    display: "flex",
    justifyContent: "center",
  },

  loginHeading: {
    fontSize: "1.3rem",
    fontWeight: 500,
    textAlign: "center",
    marginBottom: 10,
  },
  textFields: {
    marginBottom: "30px !important",
  },
  signupText: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: "1rem",
    "& span": {
      fontWeight: 500,
      color: "blue",
      cursor: "pointer",
    },
  },

  loginButton: {
    backgroundColor: ` ${Colors.red} !important`,
    width: "30% !important",
    height: "40px !important",
    margin: "20px 0px !important",
    borderRadius: "20px !important",
  },
  loginButtonDisabled: {
    width: "30% !important",
    height: "40px !important",
    margin: "20px 0px !important",
    borderRadius: "20px !important",
  },
  loginButtonContainer: {
    display: " flex",
    justifyContent: " center",
  },
  loginPaper: {
    borderRadius: "10px !important",
    border: "1px solid #cccccc7a",

    padding: " 10px 15px 20px",
  },
}));
export { useStyles };
