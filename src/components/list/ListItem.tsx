import React, { useState } from "react";

import { Paper } from "@mui/material/";

import { IUserList } from "types/types";

import { Link } from "react-router-dom";

import { yellow } from "@mui/material/colors";

const ListItem = ({ name, id }: IUserList) => {
  const [elevation, setElevation] = useState<number>(1);

  return (
    <Link
      onMouseEnter={() => setElevation(5)}
      onMouseLeave={() => setElevation(1)}
      to={id}
      style={{
        textDecoration: "none",
      }}
    >
      <Paper elevation={elevation} sx={{ p: 2, backgroundColor: yellow[400] }}>
        {name}
      </Paper>
    </Link>
  );
};

export default ListItem;
