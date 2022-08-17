import React from "react";

import { useSelector } from "react-redux";

import { IStore, IUserList } from "types";

import { Outlet } from "react-router-dom";

import { Box, Typography } from "@mui/material/";

const Dashboard = () => {
  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  return (
    <Box sx={{ p: 2 }}>
      <Typography noWrap>Logged as LtCodename.</Typography>
      <Typography noWrap>This portal uses RAWG API.</Typography>
      <Typography
        noWrap
      >{`There are ${userLists.length} lists in your Game Keeper.`}</Typography>
      <Typography noWrap>Version: 1.001.</Typography>
      <Outlet />
    </Box>
  );
};

export default Dashboard;
