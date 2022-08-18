import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import db from "api/firebase";

import { getDoc, doc } from "@firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { LISTS_SET, SECTIONS_SET, BLOCKS_SET, USER_SET } from "redux/actions";

import { Backdrop, CircularProgress } from "@mui/material/";

import { Routes, Route } from "react-router-dom";

import Header from "components/Header/Header";
import Dashboard from "components/Dashboard";
import List from "components/List/List";
import Login from "components/Login";

const Loader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  // const getGameInfo = () => {
  //   getGameInformation("Firewatch")
  //     .then((res: any) => {
  //       console.log(res);
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // };

  const userPresenceCheck = () => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        dispatch({
          type: USER_SET,
          payload: user,
        });

        getData(); // lists, sections, blocks
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
    const usersRef = doc(db, "users", "f8CNiv7pLZeHe5jDmnPrO3qQAs32");

    await getDoc(usersRef)
      .then((doc: any) => {
        const allUserData = doc.data() || {};

        dispatch({
          type: LISTS_SET,
          payload: allUserData.lists,
        });

        dispatch({
          type: SECTIONS_SET,
          payload: allUserData.sections,
        });

        dispatch({
          type: BLOCKS_SET,
          payload: allUserData.blocks,
        });
      })
      .catch((error: any) => {
        console.log(error);
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
    </>
  );
};

export default Loader;
