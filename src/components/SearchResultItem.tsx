/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import React, { useState } from "react";

import { Paper, Typography } from "@mui/material/";

export interface Props {
  onClick: () => void;
  name: string;
  listName?: string;
  sectionName?: string;
}

const SearchResultItem = ({ onClick, name, listName, sectionName }: Props) => {
  const [elevation, setElevation] = useState(1);

  return (
    <Paper
      onMouseEnter={() => setElevation(5)}
      onMouseLeave={() => setElevation(1)}
      onClick={onClick}
      elevation={elevation}
      sx={{ p: 2, cursor: "pointer" }}
    >
      <Typography>{name}</Typography>

      {listName && sectionName && (
        <Typography fontSize={16}>{`${listName} / ${sectionName}`}</Typography>
      )}
    </Paper>
  );
};

export default SearchResultItem;
