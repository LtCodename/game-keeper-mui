import React from "react";

import {
  Dialog,
  DialogTitle,
  Stack,
  Button,
  Box,
  Divider,
} from "@mui/material/";

import { IRawgSearchResponce, IRawgSearchResult } from "types";

import SearchItem from "./SearchItem";

export interface Props {
  open: boolean;
  onGameSelect: (rawgId: string) => void;
  searchResults: IRawgSearchResponce | undefined;
  handleClose: () => void;
}

const SearchDialog = ({
  open,
  onGameSelect,
  searchResults,
  handleClose,
}: Props) => (
  <Dialog
    onClose={handleClose}
    open={open}
    sx={{ overflowY: "hidden", maxHeight: 500 }}
  >
    <DialogTitle sx={{ py: 2 }}>Select Game</DialogTitle>
    <Divider />
    <Stack direction="column" spacing={1} sx={{ p: 2, overflowY: "auto" }}>
      {searchResults?.results?.map((searchResult: IRawgSearchResult) => (
        <SearchItem
          key={searchResult.id}
          onClick={() => onGameSelect(searchResult.id)}
          name={searchResult.name}
        />
      ))}
    </Stack>
    <Divider />
    <Box
      sx={{ display: "flex", width: "100%", justifyContent: "center", py: 2 }}
    >
      <Button sx={{ mr: 2 }} variant="outlined" onClick={handleClose}>
        Close
      </Button>
    </Box>
  </Dialog>
);

export default SearchDialog;
