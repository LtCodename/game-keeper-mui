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

import { useSelector } from "react-redux";

import { useTheme } from "@mui/material/styles";

import {
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material/";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import AddListDialog from "components/AddDialogs/AddListDialog";
import ListItem from "components/List/ListItem";
import Toast from "components/Toast";

import { DRAWER_WIDTH } from "config";

import type { SnackbarMessage, Store } from "types";

import DrawerHeader from "./styles";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ListSelector = ({ open, onClose }: Props) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [snackbarState, setSnackbarState] = useState<SnackbarMessage>({
    open: false,
    isError: false,
    message: "",
  });

  const theme = useTheme();
  const userLists = useSelector((state: Store) => state.userLists) || [];

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
      anchor="left"
      onClose={onClose}
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
        {userLists.map((list) => (
          <ListItem key={list.id} list={list} onClose={() => onClose()} />
        ))}
      </Stack>

      {isAddDialogOpen && (
        <AddListDialog
          open={isAddDialogOpen}
          handleClose={() => setIsAddDialogOpen(false)}
          callback={(isError, message) =>
            setSnackbarState({
              isError,
              message,
              open: true,
            })
          }
        />
      )}

      <Toast
        isError={snackbarState.isError}
        message={snackbarState.message}
        open={snackbarState.open}
        onClose={() =>
          setSnackbarState((previousState: SnackbarMessage) => ({
            ...previousState,
            open: false,
          }))
        }
      />
    </Drawer>
  );
};

export default ListSelector;
