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
  FormHelperText,
  TextField,
} from "@mui/material/";

import LoadingButton from "@mui/lab/LoadingButton";

import PublishIcon from "@mui/icons-material/Publish";

import * as yup from "yup";

import { ErrorMessage, Form, Formik } from "formik";

import type { AddListForm, SnackbarMessage, Store, UserList } from "types";

import { useDispatch, useSelector } from "react-redux";

import { doc, setDoc } from "firebase/firestore";

import db from "api/firebase";

import { LISTS_SET } from "redux/actions";

import Toast from "components/Toast";

import { SNACKBAR_SUCCESS } from "config";

export interface Props {
  open: boolean;
  handleClose: () => void;
  callback: (isError: boolean, message: string) => void;
}

const defaultValues: {
  listName: string;
} = {
  listName: "",
};

const validationSchema = yup.object().shape({
  listName: yup.string().required("List name is a required field"),
});

const AddListDialog = ({ open, handleClose, callback }: Props) => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [snackbarState, setSnackbarState] = useState<SnackbarMessage>({
    open: false,
    isError: false,
    message: "",
  });

  const userData = useSelector((state: Store) => state.userData) || null;
  const userLists = useSelector((state: Store) => state.userLists) || [];
  const userSections = useSelector((state: Store) => state.userSections) || [];
  const userBlocks = useSelector((state: Store) => state.userBlocks) || [];

  const submitForm = async (data: { listName: string }) => {
    setIsSubmitting(true);

    const newListId: string = `id${new Date().getTime()}`;

    const newList: UserList = {
      id: newListId,
      name: data.listName,
    };

    const listsCopy = [...userLists, newList];

    await setDoc(doc(db, "users", userData.uid), {
      lists: listsCopy,
      sections: userSections,
      blocks: userBlocks,
    })
      .then(() => {
        handleClose();

        callback(false, SNACKBAR_SUCCESS);

        dispatch({
          type: LISTS_SET,
          payload: listsCopy,
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

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ pl: 2, pb: 0 }}>Add List</DialogTitle>
      <Box sx={{ p: 2 }}>
        <Formik
          initialValues={defaultValues}
          onSubmit={(values: AddListForm) => {
            submitForm(values);
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
        >
          {({ errors, handleChange, handleSubmit, touched }) => (
            <Form autoComplete="off" id="list-add-form" onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: 300,
                }}
              >
                <FormControl
                  error={Boolean(errors.listName && touched.listName)}
                  fullWidth
                >
                  <TextField
                    id="listName"
                    label="List Name"
                    defaultValue=""
                    variant="filled"
                    autoFocus
                    name="listName"
                    onChange={handleChange}
                  />

                  <ErrorMessage name="listName">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
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
                    loading={isSubmitting}
                    loadingPosition="start"
                    startIcon={<PublishIcon />}
                    variant="outlined"
                    form="list-add-form"
                    type="submit"
                    color="success"
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

export default AddListDialog;
