import React, { useState } from "react";

import { Paper } from "@mui/material/";

import { IUserList } from "types/types";

import { Link } from "react-router-dom";

const ListItem = ({ name, id }: IUserList) => {
  const [elevation, setElevation] = useState<number>(1);

  return (
    <Link
      onMouseEnter={() => setElevation(5)}
      onMouseLeave={() => setElevation(1)}
      to={id}
      style={{
        textDecoration: "none",
        margin: "0 16px 16px 0",
      }}
    >
      <Paper elevation={elevation} sx={{ p: 2 }}>
        {name}
      </Paper>
    </Link>
  );
};

export default ListItem;
