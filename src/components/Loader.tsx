import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import db from "api/firebase";

import { getDoc, doc } from "@firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { LISTS_SET, SECTIONS_SET, BLOCKS_SET } from "redux/actions";

import { Backdrop, CircularProgress } from "@mui/material/";

const Loader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const getUser = async () => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user exists");
        getData(); // lists, sections, blocks
      } else {
        console.log("user does not exist");
      }
    });
  };

  const getData = async () => {
    setIsLoading(true);

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
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
