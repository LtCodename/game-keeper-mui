import React, { useState } from "react";

import { Paper } from "@mui/material/";

import { yellow } from "@mui/material/colors";

export interface Props {
  onClick: () => void;
  name: string;
}

const SearchItem = ({ onClick, name }: Props) => {
  const [elevation, setElevation] = useState<number>(1);

  return (
    <Paper
      onMouseEnter={() => setElevation(5)}
      onMouseLeave={() => setElevation(1)}
      onClick={onClick}
      elevation={elevation}
      sx={{ p: 2, cursor: "pointer", backgroundColor: yellow[400] }}
    >
      {name}
    </Paper>
  );
};

export default SearchItem;
