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

import SaveIcon from "@mui/icons-material/Save";

import * as yup from "yup";

import { Formik, Form, ErrorMessage } from "formik";

import { IStore, IUserBlock, IUserList, IUserSection } from "types";

import { useSelector, useDispatch } from "react-redux";

import { doc, setDoc } from "firebase/firestore";

import db from "api/firebase";

import { SECTIONS_SET } from "redux/actions";

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
  name: yup.string().required("Name is a required field"),
});

const EditListDialog = ({ open, handleClose, listId }: Props) => {
  const dispatch = useDispatch();

  const [isSubmittimg, setIsSubmitting] = useState<boolean>(false);

  const userData: any = useSelector((state: IStore) => state.userData) || null;

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const currentList: IUserList | undefined = userLists.find(
    (list: IUserList) => list.id === listId
  );

  const userSections: IUserSection[] =
    useSelector((state: IStore) => state.userSections) || [];

  const userBlocks: IUserBlock[] =
    useSelector((state: IStore) => state.userBlocks) || [];

  const submitForm = async (data: { name: string }) => {
    setIsSubmitting(true);

    const newSection: IUserSection = {
      id: `id${new Date().getTime()}`,
      name: data.name,
      listId,
    };

    const sectionsCopy: IUserSection[] = [...userSections, newSection];

    await setDoc(doc(db, "users", userData.uid), {
      lists: userLists,
      sections: sectionsCopy,
      blocks: userBlocks,
    })
      .then(() => {
        handleClose();

        dispatch({
          type: SECTIONS_SET,
          payload: sectionsCopy,
        });
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ pl: 2, pb: 0 }}>Edit list</DialogTitle>
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
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    form="list-edit-form"
                    type="submit"
                  >
                    Save changes
                  </LoadingButton>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};

export default EditListDialog;
