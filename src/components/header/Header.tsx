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

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material/";

import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";

import { BLOCKS_SET, LISTS_SET, SECTIONS_SET, USER_SET } from "redux/actions";

import { useDispatch } from "react-redux";

import HeaderSearchBar from "components/Header/HeaderSearchBar";
import InfoDialog from "components/InfoDialog";
import ListSelector from "components/ListSelector/ListSelector";
import Toast from "components/Toast";

import type { SnackbarMessage } from "types";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isInfoDisplayed, setIsInfoDisplayed] = useState(false);

  const [snackbarState, setSnackbarState] = useState<SnackbarMessage>({
    open: false,
    isError: true,
    message: "",
  });

  const toggleDrawer = () => {
    setIsDrawerOpen((previousState: boolean) => !previousState);
  };

  const clearStore = () => {
    dispatch({
      type: LISTS_SET,
      payload: [],
    });

    dispatch({
      type: SECTIONS_SET,
      payload: [],
    });

    dispatch({
      type: BLOCKS_SET,
      payload: [],
    });

    dispatch({
      type: USER_SET,
      payload: null,
    });
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/login", { replace: true });

        setIsDrawerOpen(false);

        setTimeout(() => {
          clearStore();
        }, 100);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          setSnackbarState((previousState: SnackbarMessage) => ({
            ...previousState,
            open: true,
            message: error.toString(),
          }));
        }
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
            >
              Game Keeper
            </Typography>
          </Box>

          <HeaderSearchBar />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              aria-label="help"
              color="inherit"
              onClick={() => setIsInfoDisplayed(true)}
            >
              <HelpIcon />
            </IconButton>
            <IconButton aria-label="logout" color="inherit" onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <ListSelector
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {isInfoDisplayed && (
        <InfoDialog
          open={isInfoDisplayed}
          onClose={() => setIsInfoDisplayed(false)}
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
    </Box>
  );
};

export default Header;
