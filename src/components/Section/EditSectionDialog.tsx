/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import React, { type SyntheticEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material/";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import LoadingButton from "@mui/lab/LoadingButton";

import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

import * as yup from "yup";

import { ErrorMessage, Form, Formik } from "formik";

import { doc, setDoc } from "firebase/firestore";

import db from "api/firebase";

import Toast from "components/Toast";
import WarningDialog from "components/WarningDialog";

import { BLOCKS_SET, SECTIONS_SET } from "redux/actions";

import { SNACKBAR_SUCCESS } from "config";

import type { EditSectionForm, SnackbarMessage, Store } from "types";

export interface Props {
  open: boolean;
  handleClose: () => void;
  sectionId: string;
  listId: string;
  deleteSectionCallback: (isError: boolean, message: string) => void;
}

const defaultValues: {
  name: string;
} = {
  name: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Make sure section name is entered/changed"),
});

const EditSectionDialog = ({
  open,
  handleClose,
  sectionId,
  listId,
  deleteSectionCallback,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSectionIndexGlobal, setCurrentSectionIndexGlobal] = useState(0);
  const [currentSectionIndexLocal, setCurrentSectionIndexLocal] = useState(0);
  const [isDeleteAlertDisplayed, setIsDeleteAlertDisplayed] = useState(false);

  const dispatch = useDispatch();

  const [snackbarState, setSnackbarState] = useState<SnackbarMessage>({
    open: false,
    isError: false,
    message: "",
  });
  const userData = useSelector((state: Store) => state.userData) || null;
  const userLists = useSelector((state: Store) => state.userLists) || [];
  const userSections = useSelector((state: Store) => state.userSections) || [];
  const userBlocks = useSelector((state: Store) => state.userBlocks) || [];
  const currentSection = userSections.find(
    (section) => section.id === sectionId
  );
  const userSectionsLocal = userSections.filter(
    (section) => section.listId === listId
  );

  useEffect(() => {
    if (currentSection && userSections?.length && userSectionsLocal?.length) {
      setCurrentSectionIndexGlobal(userSections.indexOf(currentSection));

      setCurrentSectionIndexLocal(userSectionsLocal.indexOf(currentSection));
    }
  }, [currentSection, userSections, userSectionsLocal]);

  const handleSwitchChange = async (
    event: SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    setIsSubmitting(true);

    const sectionsCopy = [...userSections];

    const targetSection = sectionsCopy.find(
      (section) => section.id === sectionId
    );

    if (targetSection) {
      targetSection.collapsed = checked;
    }

    await setDoc(doc(db, "users", userData.uid), {
      lists: userLists,
      sections: sectionsCopy,
      blocks: userBlocks,
    })
      .then(() => {
        setSnackbarState({
          open: true,
          isError: false,
          message: SNACKBAR_SUCCESS.toString(),
        });

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

  const handlePositionChange = async (event: SelectChangeEvent) => {
    setIsSubmitting(true);

    const sectionsCopy = [...userSections];
    const oldSectionPosition = sectionsCopy.findIndex(
      (section) => section.id === userSectionsLocal[currentSectionIndexLocal].id
    );
    const newSectionPosition = sectionsCopy.findIndex(
      (section) =>
        section.id === userSectionsLocal[Number(event.target.value)].id
    );
    const splicedSections = sectionsCopy.splice(oldSectionPosition, 1);

    sectionsCopy.splice(newSectionPosition, 0, splicedSections[0]);

    await setDoc(doc(db, "users", userData.uid), {
      lists: userLists,
      sections: sectionsCopy,
      blocks: userBlocks,
    })
      .then(() => {
        dispatch({
          type: SECTIONS_SET,
          payload: sectionsCopy,
        });

        setSnackbarState({
          open: true,
          isError: false,
          message: SNACKBAR_SUCCESS.toString(),
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

  const deleteSection = async () => {
    setIsDeleteAlertDisplayed(false);
    setIsSubmitting(true);

    const sectionsCopy = [...userSections];
    const blocksCopy = [...userBlocks].filter(
      (block) => block.sectionId !== sectionId
    );

    sectionsCopy.splice(currentSectionIndexGlobal, 1);

    await setDoc(doc(db, "users", userData.uid), {
      lists: userLists,
      sections: sectionsCopy,
      blocks: blocksCopy,
    })
      .then(() => {
        dispatch({
          type: SECTIONS_SET,
          payload: sectionsCopy,
        });

        dispatch({
          type: BLOCKS_SET,
          payload: blocksCopy,
        });

        deleteSectionCallback(false, SNACKBAR_SUCCESS);

        handleClose();
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

  const submitForm = async (data: { name: string }) => {
    setIsSubmitting(true);

    const sectionsCopy = [...userSections];
    const targetSection = sectionsCopy.find(
      (section) => section.id === sectionId
    );

    if (targetSection) {
      targetSection.name = data.name;
    }

    await setDoc(doc(db, "users", userData.uid), {
      lists: userLists,
      sections: sectionsCopy,
      blocks: userBlocks,
    })
      .then(() => {
        setSnackbarState({
          open: true,
          isError: false,
          message: SNACKBAR_SUCCESS.toString(),
        });

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
      <DialogTitle sx={{ pl: 2, pb: 0 }}>Edit Section</DialogTitle>
      <Box sx={{ p: 2 }}>
        <Formik
          initialValues={defaultValues}
          onSubmit={(values: EditSectionForm) => {
            submitForm(values);
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
        >
          {({ errors, handleChange, handleSubmit, touched }) => (
            <Form
              autoComplete="off"
              id="section-edit-form"
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
                    defaultValue={currentSection?.name}
                    variant="filled"
                    autoFocus
                    name="name"
                    onChange={handleChange}
                  />

                  <ErrorMessage name="name">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>

                <FormControl variant="filled" sx={{ mt: 1, width: 1 }}>
                  <InputLabel id="sectionPosition">Position</InputLabel>
                  <Select
                    labelId="sectionPosition"
                    id="sectionPosition"
                    value={currentSectionIndexLocal.toString()}
                    onChange={handlePositionChange}
                  >
                    {userSectionsLocal.map((section, index: number) => (
                      <MenuItem key={section.id} value={index}>
                        {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ mt: 1, width: 1 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentSection?.collapsed}
                        onChange={handleSwitchChange}
                      />
                    }
                    label="Keep Collapsed"
                  />
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
                    form="section-edit-form"
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
                    onClick={() => setIsDeleteAlertDisplayed(true)}
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
        onClose={() => setIsDeleteAlertDisplayed(false)}
        message="You're about to delete the whole section. All the games within it will be gone. Are you sure about it?"
        open={isDeleteAlertDisplayed}
        onAction={() => deleteSection()}
      />

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

export default EditSectionDialog;
