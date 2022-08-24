import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import db from "api/firebase";

import { getDoc, doc } from "@firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { LISTS_SET, SECTIONS_SET, BLOCKS_SET, USER_SET } from "redux/actions";

import { Backdrop, CircularProgress } from "@mui/material/";

import { Routes, Route } from "react-router-dom";

import { ISnackbar, IStore } from "types";

import Header from "components/Header/Header";
import Dashboard from "components/Dashboard";
import List from "components/List/List";
import Login from "components/Login";

import Toast from "./Toast";

export const enum GK {
  appVersion = "1.001",
  drawerWidth = 320,
  gameAddError = "Game was not added!",
  gameNameLength = 43,
  gameDevelopersLength = 59,
  addGameWindowWidth = 368,
  demoEmail = "ltcodename92@gmail.com",
  demoPassword = "22121992",
  snackbarSuccessMessage = "Success!",
}

const Loader = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [snackbarState, setSnackbarState] = useState<ISnackbar>({
    open: false,
    isError: true,
    message: "",
  });

  const userData: any = useSelector((state: IStore) => state.userData) || null;

  useEffect(() => {
    if (userData) {
      getData(); // lists, sections, blocks
    }
  }, [userData]);

  const userPresenceCheck = () => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        dispatch({
          type: USER_SET,
          payload: user,
        });
      } else {
        dispatch({
          type: USER_SET,
          payload: null,
        });

        setIsLoading(false);
      }
    });
  };

  const getData = async () => {
    const usersRef = doc(db, "users", userData.uid);

    await getDoc(usersRef)
      .then((doc: any) => {
        const allUserData = doc.data() || {};

        dispatch({
          type: LISTS_SET,
          payload: allUserData.lists || [],
        });

        dispatch({
          type: SECTIONS_SET,
          payload: allUserData.sections || [],
        });

        dispatch({
          type: BLOCKS_SET,
          payload: allUserData.blocks || [],
        });
      })
      .catch((error: any) => {
        setSnackbarState((previousState: ISnackbar) => ({
          ...previousState,
          open: true,
          message: error.toString(),
        }));
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  };

  useEffect(() => {
    userPresenceCheck();
  }, []);

  return (
    <>
      {!isLoading ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/:listId" element={<List />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<p>There is nothing here!</p>} />
          </Routes>
        </>
      ) : null}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Toast
        isError={snackbarState.isError}
        message={snackbarState.message}
        open={snackbarState.open}
        onClose={() =>
          setSnackbarState((previousState: ISnackbar) => ({
            ...previousState,
            open: false,
          }))
        }
      />
    </>
  );
};

export default Loader;
