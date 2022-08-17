import React from "react";

import { useSelector } from "react-redux";

import { IStore, IUserList } from "types/types";

import { Outlet } from "react-router-dom";

import { Box, Typography, Stack } from "@mui/material/";

import ListItem from "components/list/ListItem";

const Dashboard = () => {
  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

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
      <Outlet />
    </Box>
  );
};

export default Dashboard;
