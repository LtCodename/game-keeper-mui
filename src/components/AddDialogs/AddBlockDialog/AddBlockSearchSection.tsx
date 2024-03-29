/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import React from "react";

import { Stack } from "@mui/material/";

import SearchResultItem from "components/SearchResultItem";

import { ADD_GAME_WINDOW_WIDTH } from "config";

import type { RawgSearchResponse, RawgSearchResult } from "types";

export interface Props {
  onGameSelect: (id: number) => void;
  searchResults: RawgSearchResponse | undefined;
}

const AddBlockSearchSection = ({ onGameSelect, searchResults }: Props) => (
  <Stack
    direction="column"
    spacing={1}
    sx={{
      p: 2,
      mt: 2,
      overflowY: "auto",
      maxHeight: 300,
      width: ADD_GAME_WINDOW_WIDTH,
    }}
  >
    {searchResults?.results?.map((searchResult: RawgSearchResult) => (
      <SearchResultItem
        key={searchResult.id}
        onClick={() => onGameSelect(Number(searchResult.id))}
        name={searchResult.name}
      />
    ))}
  </Stack>
);

export default AddBlockSearchSection;
