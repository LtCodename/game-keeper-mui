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

import type {
  AddSectionForm,
  SnackbarMessage,
  Store,
  UserSection,
} from "types";

import { useDispatch, useSelector } from "react-redux";

import { doc, setDoc } from "firebase/firestore";

import db from "api/firebase";

import { SECTIONS_SET } from "redux/actions";

import Toast from "components/Toast";

import { SNACKBAR_SUCCESS } from "config";

export interface Props {
  open: boolean;
  handleClose: () => void;
  listId: string;
  callback: (isError: boolean, message: string) => void;
}

const defaultValues: {
  sectionName: string;
} = {
  sectionName: "",
};

const validationSchema = yup.object().shape({
  sectionName: yup.string().required("Section name is a required field"),
});

const AddSectionDialog = ({ open, handleClose, listId, callback }: Props) => {
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

  const submitForm = async (data: { sectionName: string }) => {
    setIsSubmitting(true);

    const newSection: UserSection = {
      id: `id${new Date().getTime()}`,
      name: data.sectionName,
      listId,
    };

    const sectionsCopy = [...userSections, newSection];

    await setDoc(doc(db, "users", userData.uid), {
      lists: userLists,
      sections: sectionsCopy,
      blocks: userBlocks,
    })
      .then(() => {
        handleClose();

        callback(false, SNACKBAR_SUCCESS);

        dispatch({
          type: SECTIONS_SET,
          payload: sectionsCopy,
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
      <DialogTitle sx={{ pl: 2, pb: 0 }}>Add Section</DialogTitle>
      <Box sx={{ p: 2 }}>
        <Formik
          initialValues={defaultValues}
          onSubmit={(values: AddSectionForm) => {
            submitForm(values);
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
        >
          {({ errors, handleChange, handleSubmit, touched }) => (
            <Form
              autoComplete="off"
              id="list-section-form"
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
                  error={Boolean(errors.sectionName && touched.sectionName)}
                  fullWidth
                >
                  <TextField
                    id="sectionName"
                    label="Section Name"
                    defaultValue=""
                    variant="filled"
                    autoFocus
                    name="sectionName"
                    onChange={handleChange}
                  />

                  <ErrorMessage name="sectionName">
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
                    form="list-section-form"
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

export default AddSectionDialog;
