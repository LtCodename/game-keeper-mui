import React, { useState } from "react";

import {
  DialogTitle,
  Button,
  Dialog,
  Box,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material/";

import { IUserBlock, IStore, IUserList, IUserSection } from "types";

import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import LoadingButton from "@mui/lab/LoadingButton";

import AlertDialog from "components/AlertDialog";

import { useSelector, useDispatch } from "react-redux";

import { doc, setDoc } from "firebase/firestore";

import db from "api/firebase";

import { BLOCKS_SET } from "redux/actions";

interface Props {
  block: IUserBlock | undefined;
  open: boolean;
  handleClose: () => void;
}

const BlockModal = ({ block, open, handleClose }: Props) => {
  const dispatch = useDispatch();

  const [isSubmittimg, setIsSubmitting] = useState<boolean>(false);
  const [isDeleteAlertDisplayed, setIsDeleteAlertDisplayed] =
    useState<boolean>(false);

  const userData: any = useSelector((state: IStore) => state.userData) || null;

  const userBlocks: IUserBlock[] =
    useSelector((state: IStore) => state.userBlocks) || [];

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const userSections: IUserSection[] =
    useSelector((state: IStore) => state.userSections) || [];

  const confirmDelete = async () => {
    setIsDeleteAlertDisplayed(true);
  };

  const deleteBlock = async () => {
    setIsDeleteAlertDisplayed(false);
    setIsSubmitting(true);

    const blocksCopy: IUserBlock[] = [...userBlocks];

    const targetBlockIndex: number = blocksCopy.findIndex(
      (blockToRemove: IUserBlock) => blockToRemove.id === block?.id
    );

    if (targetBlockIndex > -1) {
      blocksCopy.splice(targetBlockIndex, 1);
    }

    await setDoc(doc(db, "users", userData.uid), {
      lists: userLists,
      sections: userSections,
      blocks: blocksCopy,
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
        handleClose();
      });
  };

  const handleSave = async () => {
    setIsSubmitting(true);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ pl: 2, pb: 0 }}>{block?.name}</DialogTitle>
      <Box
        sx={{
          p: 2,
        }}
      >
        <FormControl variant="filled" sx={{ minWidth: 130, mr: 2 }}>
          <InputLabel id="sectionPosition">List</InputLabel>
          <Select
            labelId="sectionPosition"
            id="sectionPosition"
            // value={currentSectionIndexLocal.toString()}
            // onChange={handlePositionChange}
          >
            {/* {userSectionsLocal.map((section: IUserSection, index: number) => (
              <MenuItem key={section.id} value={index}>
                {index + 1}
              </MenuItem>
            ))} */}
          </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ minWidth: 130 }}>
          <InputLabel id="sectionPosition">Section</InputLabel>
          <Select
            labelId="sectionPosition"
            id="sectionPosition"
            // value={currentSectionIndexLocal.toString()}
            // onChange={handlePositionChange}
          >
            {/* {userSectionsLocal.map((section: IUserSection, index: number) => (
              <MenuItem key={section.id} value={index}>
                {index + 1}
              </MenuItem>
            ))} */}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button sx={{ mr: 2 }} variant="outlined" onClick={handleClose}>
          Close
        </Button>
        <LoadingButton
          sx={{ mr: 2 }}
          loading={isSubmittimg}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
          color="success"
          onClick={handleSave}
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

      <AlertDialog
        onClose={() => setIsDeleteAlertDisplayed(false)}
        message="You're about to delete this game. Are you sure about it?"
        open={isDeleteAlertDisplayed}
        onAction={() => deleteBlock()}
      />
    </Dialog>
  );
};

export default BlockModal;
