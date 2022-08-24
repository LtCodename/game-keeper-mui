import React, { useState } from "react";

import { Paper, Typography } from "@mui/material/";

import { grey, yellow } from "@mui/material/colors";

export interface Props {
  onClick: () => void;
  name: string;
  listName?: string;
  sectionName?: string;
}

const SearchResultItem = ({ onClick, name, listName, sectionName }: Props) => {
  const [elevation, setElevation] = useState<number>(1);

  return (
    <Paper
      onMouseEnter={() => setElevation(5)}
      onMouseLeave={() => setElevation(1)}
      onClick={onClick}
      elevation={elevation}
      sx={{ p: 2, cursor: "pointer", backgroundColor: yellow[400] }}
    >
      <Typography>{name}</Typography>

      {listName && sectionName && (
        <Typography fontSize={16} sx={{ color: grey[700] }}>
          {`${listName} / ${sectionName}`}
        </Typography>
      )}
    </Paper>
  );
};

export default SearchResultItem;
