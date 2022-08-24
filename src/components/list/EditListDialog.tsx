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

import { ISnackbar, IStore, IUserBlock, IUserList, IUserSection } from "types";

import { useDispatch, useSelector } from "react-redux";

import { doc, setDoc } from "firebase/firestore";

import db from "api/firebase";

import Toast from "components/Toast";
import WarningDialog from "components/WarningDialog";

import { BLOCKS_SET, LISTS_SET, SECTIONS_SET } from "redux/actions";

import { SNACKBAR_SUCCESS } from "config";

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
  const navigate = useNavigate();

  const [isSubmittimg, setIsSubmitting] = useState<boolean>(false);

  const [currentListIndex, setCurrentListIndex] = useState<number>(0);

  const [isLastAlertDisplayed, setIsLastAlertDisplayed] =
    useState<boolean>(false);

  const [isDeleteAlertDisplayed, setIsDeleteAlertDisplayed] =
    useState<boolean>(false);

  const [snackbarState, setSnackbarState] = useState<ISnackbar>({
    open: false,
    isError: false,
    message: "",
  });

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

  useEffect(() => {
    if (currentList && userLists.length) {
      setCurrentListIndex(userLists.indexOf(currentList));
    }
  }, [currentList, userLists]);

  const handlePositionChange = async (event: SelectChangeEvent) => {
    setIsSubmitting(true);

    const listsCopy: IUserList[] = [...userLists];

    if (currentListIndex.toString() === event.target.value) {
      return;
    }

    const splicedLists: IUserList[] = listsCopy.splice(currentListIndex, 1);

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

        setSnackbarState({
          open: true,
          isError: false,
          message: SNACKBAR_SUCCESS.toString(),
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
    const listsCopy: IUserList[] = [...userLists];

    const sectionsCopy: IUserSection[] = [...userSections].filter(
      (section: IUserSection) => {
        if (section.listId !== listsCopy[currentListIndex].id) {
          return true;
          // eslint-disable-next-line no-else-return
        } else {
          deletedSectionsIds.push(section.id);
          return false;
        }
      }
    );

    const blocksCopy: IUserBlock[] = [...userBlocks].filter(
      (block: IUserBlock) => deletedSectionsIds.indexOf(block.sectionId) === -1
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

  const submitForm = async (data: { name: string }) => {
    setIsSubmitting(true);

    const listsCopy: IUserList[] = [...userLists];

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

        setSnackbarState({
          open: true,
          isError: false,
          message: SNACKBAR_SUCCESS.toString(),
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
      <DialogTitle sx={{ pl: 2, pb: 0 }}>Edit List</DialogTitle>
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

                <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="listPosition">Position</InputLabel>
                  <Select
                    labelId="listPosition"
                    id="listPosition"
                    value={currentListIndex.toString()}
                    onChange={handlePositionChange}
                  >
                    {userLists.map((list: IUserList, index: number) => (
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
                    loading={isSubmittimg}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    form="list-edit-form"
                    color="success"
                    type="submit"
                  >
                    Save
                  </LoadingButton>
                  <LoadingButton
                    loading={isSubmittimg}
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

export default EditListDialog;
