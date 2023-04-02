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

import type { UserList } from "types";

import { Link } from "react-router-dom";

import { useTheme } from "@mui/material/styles";

interface Props {
  onClose: () => void;
  list: UserList;
}

const ListItem = ({ list, onClose }: Props) => {
  const theme = useTheme();

  const [elevation, setElevation] = useState(1);

  const { name, id } = list;

  return (
    <Link
      onMouseEnter={() => setElevation(5)}
      onMouseLeave={() => setElevation(1)}
      to={id}
      style={{
        textDecoration: "none",
      }}
      onClick={onClose}
    >
      <Paper
        elevation={elevation}
        sx={{
          p: 2,
          backgroundColor: theme.palette.secondary.light,
        }}
      >
        <Typography fontSize="1rem" fontWeight={600}>
          {name}
        </Typography>
      </Paper>
    </Link>
  );
};

export default ListItem;
