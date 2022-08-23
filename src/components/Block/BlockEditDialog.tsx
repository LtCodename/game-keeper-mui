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

import { IUserBlock } from "types";

import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import LoadingButton from "@mui/lab/LoadingButton";

import AlertDialog from "components/AlertDialog";

interface Props {
  block: IUserBlock | undefined;
  open: boolean;
  handleClose: () => void;
}

const BlockModal = ({ block, open, handleClose }: Props) => {
  const [isSubmittimg, setIsSubmitting] = useState<boolean>(false);
  const [isDeleteAlertDisplayed, setIsDeleteAlertDisplayed] =
    useState<boolean>(false);

  const confirmDelete = async () => {
    setIsDeleteAlertDisplayed(true);
  };

  const deleteBlock = async () => {
    setIsDeleteAlertDisplayed(false);
    setIsSubmitting(true);
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
        message="You're about to delete this game from the section. Are you sure about it?"
        open={isDeleteAlertDisplayed}
        onAction={() => deleteBlock()}
      />
    </Dialog>
  );
};

export default BlockModal;
