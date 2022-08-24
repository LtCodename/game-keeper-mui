import React from "react";

import { useSelector } from "react-redux";

import { IStore, IUserBlock, IUserList, IUserSection } from "types";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material/";

import { GK } from "./Loader";

interface Props {
  open: boolean;
  onClose: () => void;
}

const InfoDialog = ({ onClose, open }: Props) => {
  const userData: any = useSelector((state: IStore) => state.userData) || null;

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const userSections: IUserSection[] =
    useSelector((state: IStore) => state.userSections) || [];

  const userBlocks: IUserBlock[] =
    useSelector((state: IStore) => state.userBlocks) || [];

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
          {userData?.email === GK.demoEmail && (
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
            userData?.email === GK.demoEmail
              ? "Captain Picard"
              : userData?.displayName
          }.`}</Typography>
          <Typography
            sx={{ mb: 2 }}
          >{`There are ${userLists.length} lists, ${userSections.length} sections and ${userBlocks.length} games in your Game Keeper.`}</Typography>
          <Typography>{`Version: ${GK.appVersion}.`}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
