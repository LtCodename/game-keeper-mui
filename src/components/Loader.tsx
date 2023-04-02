/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import db from "api/firebase";

import { doc, getDoc } from "@firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { BLOCKS_SET, LISTS_SET, SECTIONS_SET, USER_SET } from "redux/actions";

import { Backdrop, CircularProgress, Stack } from "@mui/material/";

import { useTheme } from "@mui/material/styles";

import { Route, Routes } from "react-router-dom";

import type { Store } from "types";

import Dashboard from "components/Dashboard";
import Header from "components/Header/Header";
import List from "components/List/List";
import Login from "components/Login";

import { useSnackbar } from "./Snackbar/SnackbarContext";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const userData = useSelector((state: Store) => state.userData) || null;

  useEffect(() => {
    if (userData) {
      getData(); // lists, sections, blocks
    }
  }, [userData]);

  const userPresenceCheck = () => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
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
      .then((doc) => {
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
      .catch((error: unknown) => {
        if (error instanceof Error) {
          snackbar.setMessage({
            severity: "error",
            message: error.toString(),
          });
        }
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
        <Stack
          sx={{
            minHeight: "100vh",
            background: theme.palette.background.default,
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path=":listId" element={<List />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </Stack>
      ) : null}

      <Backdrop
        sx={{
          color: theme.palette.common.white,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Loader;
