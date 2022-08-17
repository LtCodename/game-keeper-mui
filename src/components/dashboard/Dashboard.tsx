import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { IStore, IUserList } from "types/types";

import { Outlet } from "react-router-dom";

import {
  Box,
  Typography,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material/";

import db from "api/firebase";

import { getDoc, doc } from "@firebase/firestore";

import { LISTS_SET } from "redux/actions";

import ListItem from "components/list/ListItem";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

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

  const getData = async () => {
    const usersRef = doc(db, "users", "f8CNiv7pLZeHe5jDmnPrO3qQAs32");
    await getDoc(usersRef)
      .then((doc: any) => {
        const allUserData = doc.data() || {};

        dispatch({
          type: LISTS_SET,
          payload: allUserData.lists,
        });

        // this.props.setSectionsToStore(allUserData.sections || []);
        // this.props.setBlocksToStore(allUserData.blocks || []);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    // getGameInfo();
    if (!userLists.length) {
      setIsLoading(true);
      getData(); // lists, sections, blocks
    }
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography noWrap>Logged as LtCodename.</Typography>
      <Typography noWrap>This portal uses RAWG API.</Typography>
      <Typography noWrap>Version: 1.001.</Typography>
      <Stack direction="row" sx={{ flexWrap: "wrap", my: 2 }}>
        {userLists.map((list: IUserList) => (
          <Box sx={{ mr: 2, mb: 2 }} key={list.id}>
            <ListItem {...list} />
          </Box>
        ))}
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Outlet />
    </Box>
  );
};

export default Dashboard;
