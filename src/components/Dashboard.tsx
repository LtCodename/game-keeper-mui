import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import { IStore, IUserBlock, IUserList, IUserSection } from "types";

import { Outlet, useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material/";
import { GK } from "./Loader";

const Dashboard = () => {
  const navigate = useNavigate();

  const userData: any = useSelector((state: IStore) => state.userData) || null;

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const userSections: IUserSection[] =
    useSelector((state: IStore) => state.userSections) || [];

  const userBlocks: IUserBlock[] =
    useSelector((state: IStore) => state.userBlocks) || [];

  useEffect(() => {
    if (!userData) {
      navigate("/login", { replace: true });
    }
  }, [userData]);

  return (
    <Box sx={{ p: 2 }}>
      {userData?.email === GK.demoEmail && (
        <Typography sx={{ mb: 2 }}>
          Hello there! Look around, poke at things, press on stuff. This is a
          demo profile of Game Keeper. An app, if you will, for tracking your
          game activity. Create lists and add sections with games to them.
        </Typography>
      )}

      <Typography sx={{ mb: 2 }}>
        Game Keeper was created with React 18.2 (functional components), Redux
        and MUI 5.4.4. Forms are handled with Formik. All the game data is
        provided by RAWG API. Database and hosting implemented with Firebase.
      </Typography>
      <Typography sx={{ mb: 2 }}>{`Logged as ${
        userData?.email === GK.demoEmail
          ? "Captain Picard"
          : userData?.displayName
      }.`}</Typography>
      <Typography
        sx={{ mb: 2 }}
      >{`There are ${userLists.length} lists, ${userSections.length} sections and ${userBlocks.length} games in your Game Keeper.`}</Typography>
      <Typography sx={{ mb: 2 }}>{`Version: ${GK.appVersion}.`}</Typography>
      <Outlet />
    </Box>
  );
};

export default Dashboard;
