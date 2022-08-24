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

import { Paper } from "@mui/material/";

import { IUserList } from "types";

import { Link } from "react-router-dom";

import { yellow } from "@mui/material/colors";

interface Props {
  onClose: () => void;
  list: IUserList;
}

const ListItem = ({ list, onClose }: Props) => {
  const [elevation, setElevation] = useState<number>(1);
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
      <Paper elevation={elevation} sx={{ p: 2, backgroundColor: yellow[400] }}>
        {name}
      </Paper>
    </Link>
  );
};

export default ListItem;
