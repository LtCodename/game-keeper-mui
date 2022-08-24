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

import { ISnackbar, IStore, IUserBlock, IUserList, IUserSection } from "types";

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

  const [isSubmittimg, setIsSubmitting] = useState<boolean>(false);

  const [snackbarState, setSnackbarState] = useState<ISnackbar>({
    open: false,
    isError: false,
    message: "",
  });

  const userData: any = useSelector((state: IStore) => state.userData) || null;

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const userSections: IUserSection[] =
    useSelector((state: IStore) => state.userSections) || [];

  const userBlocks: IUserBlock[] =
    useSelector((state: IStore) => state.userBlocks) || [];

  const submitForm = async (data: { listName: string }) => {
    setIsSubmitting(true);

    const newListId: string = `id${new Date().getTime()}`;

    const newList: IUserList = {
      id: newListId,
      name: data.listName,
    };

    const listsCopy: IUserList[] = [...userLists, newList];

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
      .catch((error: any) => {
        setSnackbarState({
          open: true,
          isError: true,
          message: error.toString(),
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ pl: 2, pb: 0 }}>Add List</DialogTitle>
      <Box sx={{ p: 2 }}>
        <Formik
          initialValues={defaultValues}
          onSubmit={(values: any) => {
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
                    loading={isSubmittimg}
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
          setSnackbarState((previousState: ISnackbar) => ({
            ...previousState,
            open: false,
          }))
        }
      />
    </Dialog>
  );
};

export default AddListDialog;
