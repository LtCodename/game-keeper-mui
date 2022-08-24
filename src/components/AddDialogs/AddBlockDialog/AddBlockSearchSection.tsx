import React from "react";

import { Stack } from "@mui/material/";

import { IRawgSearchResponce, IRawgSearchResult } from "types";

import SearchResultItem from "components/SearchResultItem";

import { ADD_GAME_WINDOW_WIDTH } from "config";

export interface Props {
  onGameSelect: (id: number) => void;
  searchResults: IRawgSearchResponce | undefined;
}

const AddGameSearchSection = ({ onGameSelect, searchResults }: Props) => (
  <Stack
    direction="column"
    spacing={1}
    sx={{
      p: 2,
      overflowY: "auto",
      maxHeight: 300,
      width: ADD_GAME_WINDOW_WIDTH,
    }}
  >
    {searchResults?.results?.map((searchResult: IRawgSearchResult) => (
      <SearchResultItem
        key={searchResult.id}
        onClick={() => onGameSelect(Number(searchResult.id))}
        name={searchResult.name}
      />
    ))}
  </Stack>
);

export default AddGameSearchSection;
