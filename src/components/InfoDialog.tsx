/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import React from "react";

import { useSelector } from "react-redux";

import type { Store } from "types";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material/";

import { APP_VERSION, DEMO_EMAIL } from "config";

interface Props {
  open: boolean;
  onClose: () => void;
}

const InfoDialog = ({ onClose, open }: Props) => {
  const userData = useSelector((state: Store) => state.userData) || null;
  const userLists = useSelector((state: Store) => state.userLists) || [];
  const userSections = useSelector((state: Store) => state.userSections) || [];
  const userBlocks = useSelector((state: Store) => state.userBlocks) || [];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="info-dialog-title"
      aria-describedby="info-dialog-description"
    >
      <DialogTitle id="info-dialog-title">Hello there!</DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <Box>
          {userData?.email === DEMO_EMAIL && (
            <>
              <Typography sx={{ mb: 2 }}>
                Look around, poke at things, press on stuff. This is a demo
                profile of Game Keeper. An app, if you will, for tracking your
                game activity. Create lists and add sections with games to them.
              </Typography>

              <Typography sx={{ mb: 2 }}>
                Game Keeper was created with React 18.2, Redux and MUI 5.4.4.
                Forms are handled with Formik. All the game data is provided by
                RAWG API. Database and hosting implemented with Firebase.
              </Typography>
            </>
          )}

          <Typography sx={{ mb: 2 }}>{`Logged as ${
            userData?.email === DEMO_EMAIL
              ? "Captain Picard"
              : userData?.displayName
          }.`}</Typography>
          <Typography
            sx={{ mb: 2 }}
          >{`There are ${userLists.length} lists, ${userSections.length} sections and ${userBlocks.length} games in your Game Keeper.`}</Typography>
          <Typography>{`Version: ${APP_VERSION}.`}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
