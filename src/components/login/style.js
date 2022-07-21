import { makeStyles } from "@mui/styles";
import { Colors } from "../../utils/Colors";

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    // marginTop: 80,
  },
  loginText: {
    fontSize: "12rem",
    marginBottom: 20,
  },

  loginHeading: {
    fontSize: "1.8rem !important",
    fontWeight: `${500} !important`,
    // textAlign: "center",
    marginBottom: 30,
    opacity: 0.8,
  },
  textFields: {
    marginBottom: "30px !important",

    backgroundColor: "white",
  },

  signupText: {
    fontWeight: 500,

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
  },
  loginPaper: {
    borderRadius: 0,
    padding: " 10px 15px 20px",
  },
  test: {
    backgroundColor: "white",
    borderRadius: 90,
  },
}));
export { useStyles };
