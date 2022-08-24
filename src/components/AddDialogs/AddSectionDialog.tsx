import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  Box,
  FormControl,
  TextField,
  FormHelperText,
  Button,
} from "@mui/material/";

import LoadingButton from "@mui/lab/LoadingButton";

import PublishIcon from "@mui/icons-material/Publish";

import * as yup from "yup";

import { Formik, Form, ErrorMessage } from "formik";

import { ISnackbar, IStore, IUserBlock, IUserList, IUserSection } from "types";

import { useSelector, useDispatch } from "react-redux";

import { doc, setDoc } from "firebase/firestore";

import db from "api/firebase";

import { SECTIONS_SET } from "redux/actions";

import { GK } from "components/Loader";
import Toast from "components/Toast";

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

  const submitForm = async (data: { sectionName: string }) => {
    setIsSubmitting(true);

    const newSection: IUserSection = {
      id: `id${new Date().getTime()}`,
      name: data.sectionName,
      listId,
    };

    const sectionsCopy: IUserSection[] = [...userSections, newSection];

    await setDoc(doc(db, "usfers", userData.uid), {
      lists: userLists,
      sections: sectionsCopy,
      blocks: userBlocks,
    })
      .then(() => {
        handleClose();

        callback(false, GK.snackbarSuccessMessage);

        dispatch({
          type: SECTIONS_SET,
          payload: sectionsCopy,
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
      <DialogTitle sx={{ pl: 2, pb: 0 }}>Add Secton</DialogTitle>
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
                    loading={isSubmittimg}
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
          setSnackbarState((previousState: ISnackbar) => ({
            ...previousState,
            open: false,
          }))
        }
      />
    </Dialog>
  );
};

export default AddSectionDialog;
