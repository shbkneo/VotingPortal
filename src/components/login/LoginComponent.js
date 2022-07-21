import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseDB } from "../../services/firebase/FirebaseConfig";

import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { useStyles } from "./style.js";
import SnackBarComponent from "../../common/SnackBarComponent";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { collection, getDocs, query, where } from "firebase/firestore";
import LoginBG from "../../assets/svgs/LoginBG";
import BgGrey from "../../assets/svgs/BgGrey";
import { Images } from "../../utils/Images";
import BackgroundContainer from "../layout/BackgroundContainer";

const LoginComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const history = useHistory();

  const onEmailChangeHandler = (e) => {
    let value = e.target.value;
    setEmail(e.target.value);

    if (value) {
      if (
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
          value
        )
      ) {
        setError({ ...error, email: false });
      } else setError({ ...error, email: true });
    } else setError({ ...error, email: false });
  };
  const onPassChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = async () => {
    let user;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      user = userCredential?.user;
      let loggedUser;

      const userDbRef = collection(firebaseDB, "members");
      const q = query(userDbRef, where("id", "==", user.uid));
      const userQuerySnapshot = await getDocs(q);

      userQuerySnapshot.forEach((doc) => {
        loggedUser = { ...doc.data() };
      });
      dispatch(actions.loginSucces(loggedUser));
      // localStorage.setItem("token", user.accessToken);
      // localStorage.setItem("userid", user.uid);
      history.push("/voting");
    } catch (error) {
      setAlertMessage(error.code || error.message);
      setOpen(true);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleCloseAlert = () => {
    setOpen(false);
  };
  return (
    <BackgroundContainer>
      <Grid container>
        <Grid item xs={7} container>
          <Grid item xs={12}>
            <Typography className={classes.loginHeading}>LOGIN</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ margin: "10px 0px 20px 0px" }}>
              Enter your details to login your account
            </Typography>
          </Grid>

          <Grid item xs={11}>
            <TextField
              required
              className={classes.textFields}
              label="email"
              fullWidth
              size="small"
              error={error.email}
              value={email}
              onChange={onEmailChangeHandler}
            ></TextField>
          </Grid>
          <Grid item xs={11}>
            <TextField
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onPassChangeHandler}
              required
              label="password"
              size="small"
              className={classes.textFields}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={11}>
            <Typography
              style={{
                textDecoration: "underline",
                opacity: 0.8,
              }}
              onClick={() => history.push("/forgot-password")}
            >
              Forgot Password ?
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <p className={classes.signupText}>
              Create an admin account?&nbsp;
              <span onClick={() => history.push("/register")}>
                Sign up here
              </span>
            </p>
          </Grid>
          <Grid item xs={11}>
            <Box className={classes.loginButtonContainer}>
              {!email || !password || error.email || error.password ? (
                <Button
                  variant="contained"
                  disabled
                  fullWidth
                  className={classes.loginButtonDisabled}
                >
                  Login
                </Button>
              ) : (
                <Button
                  onClick={onSubmitHandler}
                  variant="contained"
                  fullWidth
                  className={classes.loginButton}
                >
                  Login
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <SnackBarComponent
        handleClose={handleCloseAlert}
        open={open}
        type="error"
        message={alertMessage}
      />
    </BackgroundContainer>
  );
};

export default LoginComponent;
