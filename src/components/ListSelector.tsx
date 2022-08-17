import React from "react";

import { useTheme } from "@mui/material/styles";

import { IconButton, Typography, Drawer, Divider, Stack } from "@mui/material/";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ListItem from "components/list/ListItem";

import DRAWER_WIDTH from "constants";

import { IStore, IUserList } from "types";

import { useSelector } from "react-redux";
import { DrawerHeader } from "./header/styles";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ListSelector = ({ open, onClose }: Props) => {
  const theme = useTheme();
  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" }, ml: 1 }}
        >
          Lists
        </Typography>
        <IconButton onClick={onClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Stack direction="column" spacing={1} sx={{ flexWrap: "wrap", p: 2 }}>
        {userLists.map((list: IUserList) => (
          <ListItem key={list.id} list={list} onClose={() => onClose()} />
        ))}
      </Stack>
    </Drawer>
  );
};

export default ListSelector;
