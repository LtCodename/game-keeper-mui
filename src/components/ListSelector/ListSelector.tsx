import React, { useState } from "react";

import { useTheme } from "@mui/material/styles";

import {
  IconButton,
  Typography,
  Drawer,
  Divider,
  Stack,
  Button,
} from "@mui/material/";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ListItem from "components/List/ListItem";
import AddListDialog from "components/AddDialogs/AddListDialog";

import { IStore, IUserList } from "types";

import { useSelector } from "react-redux";

import { GK } from "components/Loader";

import DrawerHeader from "./styles";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ListSelector = ({ open, onClose }: Props) => {
  const theme = useTheme();
  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  return (
    <Drawer
      sx={{
        width: GK.drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: GK.drawerWidth,
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
        <Button
          variant="contained"
          onClick={() => setIsAddDialogOpen(true)}
          sx={{ mr: 2 }}
        >
          Add List
        </Button>
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
      {isAddDialogOpen && (
        <AddListDialog
          open={isAddDialogOpen}
          handleClose={() => setIsAddDialogOpen(false)}
        />
      )}
    </Drawer>
  );
};

export default ListSelector;
