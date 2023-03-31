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

import { ISnackbar, IStore, IUserBlock, IUserList, IUserSection } from "types";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";

import LoadingButton from "@mui/lab/LoadingButton";

import Toast from "components/Toast";
import WarningDialog from "components/WarningDialog";

import { useDispatch, useSelector } from "react-redux";

import { doc, setDoc } from "firebase/firestore";

import db from "api/firebase";

import { BLOCKS_SET } from "redux/actions";

import { formatReleaseDate, processDevelopers, trimName } from "sharedLogic";

import { getGameInformation } from "api/rawgApi";

import { SNACKBAR_SUCCESS } from "config";

interface Props {
  block: IUserBlock | undefined;
  open: boolean;
  handleClose: () => void;
  listId?: string | undefined;
  callback: (isError: boolean, message: string) => void;
}

interface IGameMeta {
  developers: string;
  releaseDate: string;
  name: string;
}

const EditBlockDialog = ({
  block,
  open,
  handleClose,
  listId,
  callback,
}: Props) => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteAlertDisplayed, setIsDeleteAlertDisplayed] = useState(false);

  const [listSelectorValue, setListSelectorValue] = useState<
    string | undefined
  >(listId);

  const [sectionSelectorValue, setSectionSelectorValue] = useState<
    string | undefined
  >(block?.sectionId);

  const [gameMeta, setGameMeta] = useState<IGameMeta>({
    developers: block?.developers || "",
    releaseDate: block?.releaseDate || "",
    name: block?.name || "",
  });

  const [snackbarState, setSnackbarState] = useState<ISnackbar>({
    open: false,
    isError: false,
    message: "",
  });

  const userData = useSelector((state: IStore) => state.userData) || null;

  const userBlocks: IUserBlock[] =
    useSelector((state: IStore) => state.userBlocks) || [];

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const userSections: IUserSection[] =
    useSelector((state: IStore) => state.userSections) || [];

  const refreshGameInfo = async () => {
    setIsSubmitting(true);

    await getGameInformation(block?.apiId)
      .then((data) => {
        setGameMeta({
          developers: processDevelopers(data.developers),
          releaseDate: data.released,
          name: data.name,
        });

        setSnackbarState({
          isError: false,
          open: true,
          message: SNACKBAR_SUCCESS.toString(),
        });
      })
      .catch(() => {
        setSnackbarState({
          open: true,
          isError: true,
          message: "RAWG failed to return game details",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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

    const blocksCopy: IUserBlock[] = [...userBlocks];

    const targetBlockIndex: number = blocksCopy.findIndex(
      (blockToRemove: IUserBlock) => blockToRemove.id === block?.id
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
          setSnackbarState({
            isError: true,
            open: true,
            message: error.toString(),
          });
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleListChange = (event: SelectChangeEvent) => {
    const sections: IUserSection[] = userSections.filter(
      (section: IUserSection) => section.listId === event.target.value
    );

    setListSelectorValue(event.target.value);
    setSectionSelectorValue(sections[0].id);
  };

  const handleSectionChange = (event: SelectChangeEvent) => {
    setSectionSelectorValue(event.target.value);
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    const blocksCopy: IUserBlock[] = [...userBlocks];

    const targetBlock: IUserBlock | undefined = blocksCopy.find(
      (iterator: IUserBlock) => iterator.id === block?.id
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

        setSnackbarState({
          isError: false,
          open: true,
          message: SNACKBAR_SUCCESS.toString(),
        });
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          setSnackbarState({
            isError: true,
            open: true,
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
        <Typography color="text.secondary">{gameMeta?.developers}</Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
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
            {userLists.map((list: IUserList) => (
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
              .filter(
                (section: IUserSection) => section.listId === listSelectorValue
              )
              .map((section: IUserSection) => (
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

      <Toast
        isError={snackbarState.isError}
        message={snackbarState.message}
        open={snackbarState.open}
        onClose={() =>
          setSnackbarState((previousState: ISnackbar) => ({
            ...previousState,
            open: false,
          }))
        }
      />
    </Dialog>
  );
};

export default EditBlockDialog;
