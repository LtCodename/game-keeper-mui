import React, { useState, useEffect } from "react";

import {
  DialogTitle,
  Button,
  Dialog,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material/";

import { IUserBlock, IStore, IUserList, IUserSection } from "types";

import Select, { SelectChangeEvent } from "@mui/material/Select";

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
  const [selectedListSections, setSelectedListSections] =
    useState<IUserSection[]>();
  const [listSelectorValue, setListSelectorValue] = useState<string>("");
  const [sectionSelectorValue, setSectionSelectorValue] = useState<string>("");

  const userData: any = useSelector((state: IStore) => state.userData) || null;

  const userBlocks: IUserBlock[] =
    useSelector((state: IStore) => state.userBlocks) || [];

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const userSections: IUserSection[] =
    useSelector((state: IStore) => state.userSections) || [];

  useEffect(() => {
    if (block && userLists?.length) {
      const section: IUserSection | undefined = userSections.find(
        (section: IUserSection) => section.id === block?.sectionId
      );

      const list: IUserList | undefined = userLists.find(
        (list: IUserList) => list.id === section?.listId
      );

      setListSelectorValue(list?.id || "");
      setSectionSelectorValue(block?.sectionId);
    }
  }, [block, userLists]);

  useEffect(() => {
    if (listSelectorValue.length) {
      const selectedListSections: IUserSection[] = userSections.filter(
        (section: IUserSection) => section.listId === listSelectorValue
      );

      setSelectedListSections(selectedListSections);
    }
  }, [listSelectorValue]);

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

  const handleListChange = async (event: SelectChangeEvent) => {
    setListSelectorValue(event.target.value);
  };

  const handleSectionChange = async (event: SelectChangeEvent) => {
    setSectionSelectorValue(event.target.value);
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
          width: 400,
        }}
      >
        <FormControl variant="filled" sx={{ width: `100%`, mb: 2 }}>
          <InputLabel id="game-list">List</InputLabel>
          <Select
            labelId="game-list"
            id="game-list"
            value={listSelectorValue}
            onChange={handleListChange}
          >
            {userLists.map((list: IUserList) => (
              <MenuItem key={list.id} value={list.id}>
                {list.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ width: `100%` }}>
          <InputLabel id="game-section">Section</InputLabel>
          <Select
            labelId="game-section"
            id="game-section"
            value={sectionSelectorValue}
            onChange={handleSectionChange}
          >
            {selectedListSections?.map((section: IUserSection) => (
              <MenuItem key={section.id} value={section.id}>
                {section.name}
              </MenuItem>
            ))}
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
