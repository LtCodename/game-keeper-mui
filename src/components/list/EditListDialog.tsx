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

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material/";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import LoadingButton from "@mui/lab/LoadingButton";

import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

import { useNavigate } from "react-router-dom";

import * as yup from "yup";

import { ErrorMessage, Form, Formik } from "formik";

import { useDispatch, useSelector } from "react-redux";

import { doc, setDoc } from "firebase/firestore";

import db from "api/firebase";

import WarningDialog from "components/WarningDialog";

import { BLOCKS_SET, LISTS_SET, SECTIONS_SET } from "redux/actions";

import { SNACKBAR_SUCCESS } from "config";

import type { EditListForm, Store } from "types";

import { useSnackbar } from "components/Snackbar/SnackbarContext";

export interface Props {
  open: boolean;
  handleClose: () => void;
  listId: string;
}

const defaultValues: {
  name: string;
} = {
  name: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Make sure list name is entered/changed"),
});

const EditListDialog = ({ open, handleClose, listId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentListIndex, setCurrentListIndex] = useState(0);
  const [isLastAlertDisplayed, setIsLastAlertDisplayed] = useState(false);
  const [isDeleteAlertDisplayed, setIsDeleteAlertDisplayed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const userData = useSelector((state: Store) => state.userData) || null;
  const userLists = useSelector((state: Store) => state.userLists) || [];
  const currentList = userLists.find((list) => list.id === listId);
  const userSections = useSelector((state: Store) => state.userSections) || [];
  const userBlocks = useSelector((state: Store) => state.userBlocks) || [];

  useEffect(() => {
    if (currentList && userLists.length) {
      setCurrentListIndex(userLists.indexOf(currentList));
    }
  }, [currentList, userLists]);

  const handlePositionChange = async (event: SelectChangeEvent) => {
    setIsSubmitting(true);

    const listsCopy = [...userLists];

    if (currentListIndex.toString() === event.target.value) {
      return;
    }

    const splicedLists = listsCopy.splice(currentListIndex, 1);

    listsCopy.splice(Number(event.target.value), 0, splicedLists[0]);

    await setDoc(doc(db, "users", userData.uid), {
      lists: listsCopy,
      sections: userSections,
      blocks: userBlocks,
    })
      .then(() => {
        dispatch({
          type: LISTS_SET,
          payload: listsCopy,
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

  const confirmDelete = async () => {
    setIsDeleteAlertDisplayed(true);
  };

  const deleteList = async () => {
    setIsDeleteAlertDisplayed(false);

    if (userLists.length === 1) {
      setIsLastAlertDisplayed(true);
      return;
    }

    setIsSubmitting(true);

    const deletedSectionsIds: string[] = [];
    const listsCopy = [...userLists];
    const sectionsCopy = [...userSections].filter((section) => {
      if (section.listId !== listsCopy[currentListIndex].id) {
        return true;
        // eslint-disable-next-line no-else-return
      } else {
        deletedSectionsIds.push(section.id);
        return false;
      }
    });

    const blocksCopy = [...userBlocks].filter(
      (block) => deletedSectionsIds.indexOf(block.sectionId) === -1
    );

    listsCopy.splice(currentListIndex, 1);

    await setDoc(doc(db, "users", userData.uid), {
      lists: listsCopy,
      sections: sectionsCopy,
      blocks: blocksCopy,
    })
      .then(() => {
        dispatch({
          type: LISTS_SET,
          payload: listsCopy,
        });

        dispatch({
          type: SECTIONS_SET,
          payload: sectionsCopy,
        });

        dispatch({
          type: BLOCKS_SET,
          payload: blocksCopy,
        });

        handleClose();
        navigate("/", { replace: true });
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

  const submitForm = async (data: { name: string }) => {
    setIsSubmitting(true);

    const listsCopy = [...userLists];

    listsCopy[currentListIndex] = {
      ...listsCopy[currentListIndex],
      name: data.name,
    };

    await setDoc(doc(db, "users", userData.uid), {
      lists: listsCopy,
      sections: userSections,
      blocks: userBlocks,
    })
      .then(() => {
        dispatch({
          type: LISTS_SET,
          payload: listsCopy,
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
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ pl: 2, pb: 0 }}>Edit List</DialogTitle>
      <Box sx={{ p: 2 }}>
        <Formik
          initialValues={defaultValues}
          onSubmit={(values: EditListForm) => {
            submitForm(values);
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
        >
          {({ errors, handleChange, handleSubmit, touched }) => (
            <Form
              autoComplete="off"
              id="list-edit-form"
              onSubmit={handleSubmit}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: 300,
                }}
              >
                <FormControl
                  error={Boolean(errors.name && touched.name)}
                  fullWidth
                >
                  <TextField
                    id="name"
                    label="Name"
                    defaultValue={currentList?.name}
                    variant="filled"
                    autoFocus
                    name="name"
                    onChange={handleChange}
                  />

                  <ErrorMessage name="name">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>

                <FormControl variant="filled" sx={{ mt: 1, width: "100%" }}>
                  <InputLabel id="listPosition">Position</InputLabel>
                  <Select
                    labelId="listPosition"
                    id="listPosition"
                    value={currentListIndex.toString()}
                    onChange={handlePositionChange}
                  >
                    {userLists.map((list, index) => (
                      <MenuItem key={list.id} value={index}>
                        {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ mt: 2 }}>
                  <Button
                    sx={{ mr: 2 }}
                    variant="outlined"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                  <LoadingButton
                    sx={{ mr: 2 }}
                    loading={isSubmitting}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    form="list-edit-form"
                    color="success"
                    type="submit"
                  >
                    Rename
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
              </Box>
            </Form>
          )}
        </Formik>
      </Box>

      <WarningDialog
        onClose={() => setIsLastAlertDisplayed(false)}
        message="Sorry, for now, I can't let you delete the last list in your Game Keeper. Just rename and repopulate it."
        open={isLastAlertDisplayed}
      />

      <WarningDialog
        onClose={() => setIsDeleteAlertDisplayed(false)}
        message="You're about to delete the whole list. All the sections and games within it will be gone. Are you sure about it?"
        open={isDeleteAlertDisplayed}
        onAction={() => deleteList()}
      />
    </Dialog>
  );
};

export default EditListDialog;
