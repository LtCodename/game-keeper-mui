/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material/";

import LoadingButton from "@mui/lab/LoadingButton";

import PublishIcon from "@mui/icons-material/Publish";

import * as yup from "yup";

import { ErrorMessage, Form, Formik } from "formik";

import type {
  RawgSearchResponse,
  SnackbarMessage,
  Store,
  UserBlock,
} from "types";

import { doc, setDoc } from "firebase/firestore";

import db from "api/firebase";

import { BLOCKS_SET } from "redux/actions";

import { getGameInformation, searchGamesByName } from "api/rawgApi";

import AddBlockSearchSection from "components/AddDialogs/AddBlockDialog/AddBlockSearchSection";
import Toast from "components/Toast";

import { formatReleaseDate, processDevelopers } from "sharedLogic";

import { ADD_GAME_WINDOW_WIDTH, SNACKBAR_SUCCESS } from "config";

export interface Props {
  open: boolean;
  handleClose: () => void;
  sectionId: string;
  callback: (isError: boolean, message: string) => void;
}

const defaultValues: {
  gameName: string;
} = {
  gameName: "",
};

const validationSchema = yup.object().shape({
  gameName: yup.string().required("Game name is a required field"),
});

const AddBlockDialog = ({ open, handleClose, sectionId, callback }: Props) => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchResults, setSearchResults] = useState<RawgSearchResponse>();
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);
  const [isSearchInProgress, setIsSearchInProgress] = useState(false);
  const [gameToAdd, setGameToAdd] = useState<UserBlock>();
  const [isAdditionalInfo, setIsAdditionalInfo] = useState(false);
  const [snackbarState, setSnackbarState] = useState<SnackbarMessage>({
    open: false,
    isError: false,
    message: "",
  });

  const userData = useSelector((state: Store) => state.userData) || null;
  const userLists = useSelector((state: Store) => state.userLists) || [];
  const userSections = useSelector((state: Store) => state.userSections) || [];
  const userBlocks = useSelector((state: Store) => state.userBlocks) || [];

  useEffect(() => {
    if (gameToAdd) {
      setIsAdditionalInfo(true);
    }
  }, [gameToAdd]);

  const submitForm = async () => {
    if (!gameToAdd) {
      setSnackbarState({
        open: true,
        isError: true,
        message: "RAWG failed to return game details",
      });

      return;
    }

    setIsSubmitting(true);

    const newBlock: UserBlock = {
      id: gameToAdd?.id,
      name: gameToAdd?.name,
      sectionId,
      apiId: gameToAdd?.apiId,
      developers: gameToAdd?.developers,
      releaseDate: gameToAdd?.releaseDate,
    };
    const blocksCopy = [...userBlocks, newBlock];

    await setDoc(doc(db, "users", userData.uid), {
      lists: userLists,
      sections: userSections,
      blocks: blocksCopy,
    })
      .then(() => {
        handleClose();

        callback(false, SNACKBAR_SUCCESS);

        dispatch({
          type: BLOCKS_SET,
          payload: blocksCopy,
        });
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          setSnackbarState({
            open: true,
            isError: true,
            message: error.toString(),
          });
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  const searchApi = async (gameName: string) => {
    setIsSearchInProgress(true);

    await searchGamesByName(gameName)
      .then((response) => {
        setSearchResults(response);
        setIsResultDisplayed(true);
      })
      .catch(() => {
        setSnackbarState({
          open: true,
          isError: true,
          message: "RAWG failed to return search results",
        });
      })
      .finally(() => {
        setIsSearchInProgress(false);
      });
  };

  const onGameSelect = async (rawgId: number) => {
    setIsResultDisplayed(false);

    await getGameInformation(rawgId)
      .then((data) => {
        setGameToAdd({
          id: `id${new Date().getTime()}`,
          name: data.name,
          sectionId,
          apiId: data.id,
          developers: processDevelopers(data.developers),
          releaseDate: data.released,
        });
      })
      .catch(() => {
        setSnackbarState({
          open: true,
          isError: true,
          message: "RAWG failed to return game details",
        });
      });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ pl: 2, pb: 0 }}>Add Game</DialogTitle>

      <Box sx={{ p: 2 }}>
        <Formik
          initialValues={defaultValues}
          onSubmit={submitForm}
          validationSchema={validationSchema}
          validateOnBlur={false}
        >
          {({ errors, handleChange, handleSubmit, touched }) => (
            <Form
              autoComplete="off"
              id="list-game-form"
              onSubmit={handleSubmit}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: ADD_GAME_WINDOW_WIDTH,
                }}
              >
                <FormControl
                  error={Boolean(errors.gameName && touched.gameName)}
                  fullWidth
                >
                  <TextField
                    id="gameName"
                    label="Game Name"
                    defaultValue=""
                    variant="filled"
                    autoFocus
                    name="gameName"
                    onChange={(
                      event: React.FormEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => {
                      handleChange(event);
                      if (event.currentTarget.value.length >= 3) {
                        searchApi(event.currentTarget.value);
                      }
                    }}
                  />

                  <ErrorMessage name="gameName">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>

                {isSearchInProgress && (
                  <CircularProgress
                    sx={{ position: "absolute", top: 10, right: 20 }}
                  />
                )}

                {isResultDisplayed && (
                  <AddBlockSearchSection
                    onGameSelect={(rawgId: number) => onGameSelect(rawgId)}
                    searchResults={searchResults}
                  />
                )}

                {isAdditionalInfo && !isResultDisplayed && (
                  <Stack
                    direction="column"
                    spacing={0}
                    sx={{ mt: 2, width: "100%", minHight: 72 }}
                  >
                    <Typography>{`Name: ${gameToAdd?.name}`}</Typography>
                    <Typography>{`Developers: ${gameToAdd?.developers}`}</Typography>
                    <Typography>{`Release date: ${formatReleaseDate(
                      gameToAdd?.releaseDate || ""
                    )}`}</Typography>
                  </Stack>
                )}

                <Box sx={{ mt: 2 }}>
                  <Button
                    sx={{ mr: 2 }}
                    variant="outlined"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                  <LoadingButton
                    loading={isSubmitting}
                    loadingPosition="start"
                    startIcon={<PublishIcon />}
                    variant="outlined"
                    form="list-game-form"
                    type="submit"
                  >
                    Add
                  </LoadingButton>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>

      <Toast
        isError={snackbarState.isError}
        message={snackbarState.message}
        open={snackbarState.open}
        onClose={() =>
          setSnackbarState((previousState: SnackbarMessage) => ({
            ...previousState,
            open: false,
          }))
        }
      />
    </Dialog>
  );
};

export default AddBlockDialog;
