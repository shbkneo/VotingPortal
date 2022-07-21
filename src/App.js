import { collection, getDocs, query, where } from "firebase/firestore";
import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import LayoutComponent from "./components/layout/LayoutComponent";
import LoginComponent from "./components/login/LoginComponent";
import RegisterComponent from "./components/register/RegisterComponent";
import DashboardComponent from "./components/dashboard/Dashboard";
import { auth, firebaseDB } from "./services/firebase/FirebaseConfig";
import * as actions from "./store/actions";
import { Button } from "@mui/material";
import VotingComponent from "./components/voting/VotingComponent";
import AdminComponent from "./components/admin";
import Results from "./components/admin/Results";
import UsersComponent from "./components/admin/Users";
import Candidates from "./components/admin/Candidates";
import ForgotPassword from "./components/login/ForgotPassword";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { async } from "@firebase/util";

const App = () => {
  const dispatch = useDispatch();
  const { login, retrieved } = useSelector((state) => state);

  useEffect(() => {
    retrievingAppState();
  }, []);
  const retrievingAppState = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        let userData;
        const userDbRef = collection(firebaseDB, "members");
        const q = query(userDbRef, where("id", "==", uid));
        const userQuerySnapshot = await getDocs(q);

        userQuerySnapshot.forEach((doc) => {
          userData = { ...doc.data() };
        });
        dispatch(actions.retrieveAppState(userData));
      } else {
        console.log("no user");
        dispatch(actions.retrieveAppState());
      }
    });
    // const token = localStorage.getItem("token");
    // const userid = localStorage.getItem("userid");
    // if (token) {
    //   let user;
    //   const userDbRef = collection(firebaseDB, "members");
    //   const q = query(userDbRef, where("id", "==", userid));
    //   const userQuerySnapshot = await getDocs(q);

    //   userQuerySnapshot.forEach((doc) => {
    //     user = { ...doc.data() };
    //   });
    //   dispatch(actions.retrieveAppState(user));
    // } else {
    //   dispatch(actions.retrieveAppState());
    // }
  };

  return (
    <LayoutComponent>
      {retrieved ? (
        <Switch>
          <Route exact path="/">
            {!login ? <Redirect to="/login" /> : <Redirect to="/voting" />}
          </Route>
          {!login && <Redirect from="/dashboard" to="/login" />}
          {!login && <Redirect from="/voting" to="/login" />}
          {!login && <Redirect from="/admin-panel" to="/login" />}
          {!login && (
            <Route exact path={"/login"}>
              <LoginComponent />
            </Route>
          )}
          {!login && (
            <Route exact path={"/forgot-password"}>
              <ForgotPassword />
            </Route>
          )}
          {login && (
            <Route exact path={"/dashboard"}>
              <DashboardComponent />
            </Route>
          )}
          {login && (
            <Route exact path={"/voting"}>
              <VotingComponent />
            </Route>
          )}
          {login && (
            <Route exact path={"/admin"}>
              <AdminComponent />
            </Route>
          )}
          {login && (
            <Route exact path={"/admin-panel/poll-results"}>
              <Results />
            </Route>
          )}
          {login && (
            <Route exact path={"/admin-panel/users"}>
              <UsersComponent />
            </Route>
          )}
          {login && (
            <Route exact path={"/admin-panel/my-teams"}>
              <Candidates />
            </Route>
          )}
          {!login && (
            <Route exact path={"/register"}>
              <Suspense fallback={<div>loading task management</div>}>
                <RegisterComponent />
              </Suspense>
            </Route>
          )}
        </Switch>
      ) : null}
    </LayoutComponent>
  );
};

export default App;
