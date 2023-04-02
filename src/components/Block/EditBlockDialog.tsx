/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import React, { useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material/";

import type { GameMeta, Store, UserBlock } from "types";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";

import LoadingButton from "@mui/lab/LoadingButton";

import WarningDialog from "components/WarningDialog";

import { useDispatch, useSelector } from "react-redux";

import { doc, setDoc } from "firebase/firestore";

import db from "api/firebase";

import { BLOCKS_SET } from "redux/actions";

import { formatReleaseDate, processDevelopers, trimName } from "logic";

import { getGameInformation } from "api/rawgApi";

import { useTheme } from "@mui/material/styles";

import { SNACKBAR_SUCCESS } from "config";

import { useSnackbar } from "components/Snackbar/SnackbarContext";

interface Props {
  block: UserBlock;
  open: boolean;
  handleClose: () => void;
  listId?: string;
  callback: (isError: boolean, message: string) => void;
}

const EditBlockDialog = ({
  block,
  open,
  handleClose,
  listId,
  callback,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteAlertDisplayed, setIsDeleteAlertDisplayed] = useState(false);
  const [listSelectorValue, setListSelectorValue] = useState(listId);
  const [sectionSelectorValue, setSectionSelectorValue] = useState(
    block?.sectionId
  );
  const [gameMeta, setGameMeta] = useState<GameMeta>({
    developers: block?.developers || "",
    releaseDate: block?.releaseDate || "",
    name: block?.name || "",
  });

  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const theme = useTheme();

  const userData = useSelector((state: Store) => state.userData) || null;
  const userBlocks = useSelector((state: Store) => state.userBlocks) || [];
  const userLists = useSelector((state: Store) => state.userLists) || [];
  const userSections = useSelector((state: Store) => state.userSections) || [];

  const refreshGameInfo = async () => {
    setIsSubmitting(true);

    await getGameInformation(block.apiId)
      .then((data) => {
        setGameMeta({
          developers: processDevelopers(data.developers),
          releaseDate: data.released,
          name: data.name,
        });

        snackbar.setMessage({
          severity: "success",
          message: SNACKBAR_SUCCESS.toString(),
        });
      })
      .catch(() => {
        snackbar.setMessage({
          severity: "error",
          message: "RAWG failed to return game details",
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  const beforeClosing = () => {
    setListSelectorValue(listId);
    setSectionSelectorValue(block?.sectionId);
    handleClose();
  };

  const confirmDelete = async () => {
    setIsDeleteAlertDisplayed(true);
  };

  const deleteBlock = async () => {
    setIsDeleteAlertDisplayed(false);
    setIsSubmitting(true);

    const blocksCopy = [...userBlocks];

    const targetBlockIndex = blocksCopy.findIndex(
      (blockToRemove) => blockToRemove.id === block?.id
    );

    if (targetBlockIndex > -1) {
      blocksCopy.splice(targetBlockIndex, 1);
    }

    await setDoc(doc(db, "users", userData.uid), {
      lists: userLists,
      sections: userSections,
      blocks: blocksCopy,
    })
      .then(() => {
        beforeClosing();

        callback(false, SNACKBAR_SUCCESS);

        dispatch({
          type: BLOCKS_SET,
          payload: blocksCopy,
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
      .finally(() => setIsSubmitting(false));
  };

  const handleListChange = (event: SelectChangeEvent) => {
    const sections = userSections.filter(
      (section) => section.listId === event.target.value
    );

    setListSelectorValue(event.target.value);
    setSectionSelectorValue(sections[0].id);
  };

  const handleSectionChange = (event: SelectChangeEvent) => {
    setSectionSelectorValue(event.target.value);
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    const blocksCopy = [...userBlocks];
    const targetBlock = blocksCopy.find(
      (iterator) => iterator.id === block?.id
    );

    if (targetBlock && sectionSelectorValue) {
      targetBlock.sectionId = sectionSelectorValue;
      targetBlock.name = gameMeta.name;
      targetBlock.developers = gameMeta.developers;
      targetBlock.releaseDate = gameMeta.releaseDate;
    }

    await setDoc(doc(db, "users", userData.uid), {
      lists: userLists,
      sections: userSections,
      blocks: blocksCopy,
    })
      .then(() => {
        dispatch({
          type: BLOCKS_SET,
          payload: blocksCopy,
        });

        snackbar.setMessage({
          severity: "success",
          message: SNACKBAR_SUCCESS.toString(),
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
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Dialog onClose={beforeClosing} open={open}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "95%",
          justifyContent: "space-between",
          pl: 2,
          pb: 0,
          pt: 1,
        }}
      >
        <DialogTitle sx={{ p: 0 }}>{trimName(gameMeta?.name)}</DialogTitle>
        <Tooltip title="Refresh meta data">
          <IconButton
            aria-label="refresh"
            color="primary"
            onClick={refreshGameInfo}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          pb: 2,
          px: 2,
          width: 400,
        }}
      >
        <Typography color={theme.palette.text.secondary}>
          {gameMeta?.developers}
        </Typography>
        <Typography color={theme.palette.text.secondary} sx={{ mb: 1 }}>
          {formatReleaseDate(gameMeta?.releaseDate)}
        </Typography>
        <FormControl variant="filled" sx={{ width: `100%`, mb: 2 }}>
          <InputLabel id="game-list">List</InputLabel>
          <Select
            labelId="game-list"
            id="game-list"
            value={listSelectorValue}
            onChange={handleListChange}
          >
            {userLists.map((list) => (
              <MenuItem key={list.id} value={list.id}>
                {list.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ width: `100%` }}>
          <InputLabel id="game-section">Section</InputLabel>
          <Select
            labelId="game-section"
            id="game-section"
            value={sectionSelectorValue}
            onChange={handleSectionChange}
          >
            {userSections
              .filter((section) => section.listId === listSelectorValue)
              .map((section) => (
                <MenuItem key={section.id} value={section.id}>
                  {section.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button sx={{ mr: 2 }} variant="outlined" onClick={beforeClosing}>
          Close
        </Button>
        <LoadingButton
          sx={{ mr: 2 }}
          loading={isSubmitting}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
          color="success"
          onClick={handleSave}
        >
          Save
        </LoadingButton>
        <LoadingButton
          loading={isSubmitting}
          loadingPosition="start"
          startIcon={<DeleteIcon />}
          variant="outlined"
          color="error"
          onClick={confirmDelete}
        >
          Delete
        </LoadingButton>
      </Box>

      <WarningDialog
        onClose={() => setIsDeleteAlertDisplayed(false)}
        message="You're about to delete this game. Are you sure about it?"
        open={isDeleteAlertDisplayed}
        onAction={() => deleteBlock()}
      />
    </Dialog>
  );
};

export default EditBlockDialog;
