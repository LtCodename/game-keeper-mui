import React from "react";

import { Stack } from "@mui/material/";

import { IRawgSearchResponce, IRawgSearchResult } from "types";

import { GK } from "components/Loader";

import SearchResultItem from "../../SearchResultItem";

export interface Props {
  onGameSelect: (id: number) => void;
  searchResults: IRawgSearchResponce | undefined;
}

const AddGameSearch = ({ onGameSelect, searchResults }: Props) => (
  <Stack
    direction="column"
    spacing={1}
    sx={{
      p: 2,
      overflowY: "auto",
      maxHeight: 300,
      width: GK.addGameWindowWidth,
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

export default AddGameSearch;
