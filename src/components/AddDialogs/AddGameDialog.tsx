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

import { IStore, IUserBlock, IUserList } from "types";

import { useSelector, useDispatch } from "react-redux";

import { doc, setDoc } from "firebase/firestore";

import db from "api/firebase";

import { BLOCKS_SET } from "redux/actions";

export interface Props {
  open: boolean;
  handleClose: () => void;
  sectionId: string;
}

const defaultValues: {
  gameName: string;
} = {
  gameName: "",
};

const validationSchema = yup.object().shape({
  gameName: yup.string().required("Game name is a required field"),
});

const AddGameDialog = ({ open, handleClose, sectionId }: Props) => {
  const dispatch = useDispatch();

  const [isSubmittimg, setIsSubmitting] = useState<boolean>(false);

  const userData: any = useSelector((state: IStore) => state.userData) || null;

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const userBlocks: IUserBlock[] =
    useSelector((state: IStore) => state.userBlocks) || [];

  const submitForm = async (data: { gameName: string }) => {
    setIsSubmitting(true);

    const newBlock: IUserBlock = {
      id: `id${new Date().getTime()}`,
      name: data.gameName,
      sectionId,
      apiId: "1",
      developers: "1",
      releaseDate: "1",
    };

    const blocksCopy: IUserBlock[] = [...userBlocks, newBlock];

    await setDoc(doc(db, "users", userData.uid), {
      lists: userLists,
      blocks: userBlocks,
    })
      .then(() => {
        handleClose();

        dispatch({
          type: BLOCKS_SET,
          payload: blocksCopy,
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
      <DialogTitle sx={{ pl: 2, pb: 0 }}>Add Game</DialogTitle>
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
              id="list-game-form"
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
                    onChange={handleChange}
                  />

                  <ErrorMessage name="gameName">
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
    </Dialog>
  );
};

export default AddGameDialog;
