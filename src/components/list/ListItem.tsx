import React from "react";

import { Box, Typography } from "@mui/material/";

import { IUserList } from "types/types";

import { Link } from "react-router-dom";

const ListItem = ({ name, id }: IUserList) => (
  <Link to={id}>
    <Box sx={{ p: 2 }}>
      <Typography noWrap>{name}</Typography>
    </Box>
  </Link>
);

export default ListItem;
