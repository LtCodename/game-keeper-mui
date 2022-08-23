import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  Box,
  FormControl,
  TextField,
  FormHelperText,
  Button,
  InputLabel,
  MenuItem,
} from "@mui/material/";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import LoadingButton from "@mui/lab/LoadingButton";

import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";

import * as yup from "yup";

import { Formik, Form, ErrorMessage } from "formik";

import { IStore, IUserBlock, IUserList, IUserSection } from "types";

import { useSelector, useDispatch } from "react-redux";

import { doc, setDoc } from "firebase/firestore";

import db from "api/firebase";

import AlertDialog from "components/AlertDialog";

import { BLOCKS_SET, SECTIONS_SET } from "redux/actions";

export interface Props {
  open: boolean;
  handleClose: () => void;
  sectionId: string;
  listId: string | undefined;
}

const defaultValues: {
  name: string;
} = {
  name: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
});

const EditSectionDialog = ({ open, handleClose, sectionId, listId }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSubmittimg, setIsSubmitting] = useState<boolean>(false);
  const [currentSectionIndexGlobal, setCurrentSectionIndexGlobal] =
    useState<number>(0);
  const [currentSectionIndexLocal, setCurrentSectionIndexLocal] =
    useState<number>(0);
  const [isDeleteAlertDisplayed, setIsDeleteAlertDisplayed] =
    useState<boolean>(false);

  const userData: any = useSelector((state: IStore) => state.userData) || null;

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const userSections: IUserSection[] =
    useSelector((state: IStore) => state.userSections) || [];

  const userBlocks: IUserBlock[] =
    useSelector((state: IStore) => state.userBlocks) || [];

  const currentSection: IUserSection | undefined = userSections.find(
    (section: IUserSection) => section.id === sectionId
  );

  const userSectionsLocal: IUserSection[] | undefined = userSections.filter(
    (section: IUserSection) => section.listId === listId
  );

  useEffect(() => {
    if (currentSection && userSections?.length && userSectionsLocal?.length) {
      setCurrentSectionIndexGlobal(userSections.indexOf(currentSection));

      setCurrentSectionIndexLocal(userSectionsLocal.indexOf(currentSection));
    }
  }, [currentSection, userSections, userSectionsLocal]);

  const handlePositionChange = async (event: SelectChangeEvent) => {
    setIsSubmitting(true);

    const sectionsCopy: IUserSection[] = [...userSections];

    const oldSectionPosition: number = sectionsCopy.findIndex(
      (section: IUserSection) =>
        section.id === userSectionsLocal[currentSectionIndexLocal].id
    );

    const newSectionPosition: number = sectionsCopy.findIndex(
      (section: IUserSection) =>
        section.id === userSectionsLocal[Number(event.target.value)].id
    );

    const splicedSections: IUserSection[] = sectionsCopy.splice(
      oldSectionPosition,
      1
    );

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
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const confirmDelete = async () => {
    setIsDeleteAlertDisplayed(true);
  };

  const deleteSection = async () => {
    setIsDeleteAlertDisplayed(false);

    setIsSubmitting(true);

    const sectionsCopy: IUserSection[] = [...userSections];

    const blocksCopy: IUserBlock[] = [...userBlocks].filter(
      (block: IUserBlock) => block.sectionId !== sectionId
    );

    sectionsCopy.splice(currentSectionIndexGlobal, 1);

    await setDoc(doc(db, "users", userData.uid), {
      lists: userLists,
      sections: sectionsCopy,
      blocks: blocksCopy,
    })
      .then(() => {
        handleClose();
        navigate("/", { replace: true });

        dispatch({
          type: SECTIONS_SET,
          payload: sectionsCopy,
        });

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

  const submitForm = async (data: { name: string }) => {
    setIsSubmitting(true);

    const sectionsCopy: IUserSection[] = [...userSections];

    const targetSection: IUserSection | undefined = sectionsCopy.find(
      (section: IUserSection) => section.id === sectionId
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
      <DialogTitle sx={{ pl: 2, pb: 0 }}>Edit Section</DialogTitle>
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

                <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="sectionPosition">Position</InputLabel>
                  <Select
                    labelId="sectionPosition"
                    id="sectionPosition"
                    value={currentSectionIndexLocal.toString()}
                    onChange={handlePositionChange}
                  >
                    {userSectionsLocal.map(
                      (section: IUserSection, index: number) => (
                        <MenuItem key={section.id} value={index}>
                          {index + 1}
                        </MenuItem>
                      )
                    )}
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
                    form="section-edit-form"
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

      <AlertDialog
        onClose={() => setIsDeleteAlertDisplayed(false)}
        message="You're about to delete the whole section. All the games within it will be gone. Are you sure about it?"
        open={isDeleteAlertDisplayed}
        onAction={() => deleteSection()}
      />
    </Dialog>
  );
};

export default EditSectionDialog;
