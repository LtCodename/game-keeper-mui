import React from "react";

import { Stack } from "@mui/material/";

import { IRawgSearchResponce, IRawgSearchResult } from "types";

import { GK } from "components/Loader";

import SearchItem from "./SearchItem";

export interface Props {
  onGameSelect: (rawgId: string) => void;
  searchResults: IRawgSearchResponce | undefined;
}

const Search = ({ onGameSelect, searchResults }: Props) => (
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
      <SearchItem
        key={searchResult.id}
        onClick={() => onGameSelect(searchResult.id)}
        name={searchResult.name}
      />
    ))}
  </Stack>
);

export default Search;
