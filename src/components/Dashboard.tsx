import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { IStore, IUserBlock, IUserList, IUserSection } from "types";

import { Outlet, Navigate } from "react-router-dom";

import { Box, Typography } from "@mui/material/";

const Dashboard = () => {
  const [isUserPresent, setIsUserPresent] = useState<boolean>(false);

  const userData: any = useSelector((state: IStore) => state.userData) || null;

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const userSections: IUserSection[] =
    useSelector((state: IStore) => state.userSections) || [];

  const userBlocks: IUserBlock[] =
    useSelector((state: IStore) => state.userBlocks) || [];

  useEffect(() => {
    setIsUserPresent(!!userData);
  }, []);

  if (!isUserPresent) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography noWrap>Logged as LtCodename.</Typography>
      <Typography noWrap>This portal uses RAWG API.</Typography>
      <Typography
        noWrap
      >{`There are ${userLists.length} lists, ${userSections.length} sections and ${userBlocks.length} games in your Game Keeper.`}</Typography>
      <Typography noWrap>Version: 1.001.</Typography>
      <Outlet />
    </Box>
  );
};

export default Dashboard;
