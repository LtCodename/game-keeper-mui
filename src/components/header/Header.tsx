/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import React, { useEffect, useState } from "react";

import { AppBar, Box, IconButton, Switch, Toolbar } from "@mui/material/";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import HelpIcon from "@mui/icons-material/Help";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";

import {
  BLOCKS_SET,
  LISTS_SET,
  SECTIONS_SET,
  THEME_SET,
  USER_SET,
} from "redux/actions";

import { useDispatch } from "react-redux";

import HeaderSearchBar from "components/Header/HeaderSearchBar";
import InfoDialog from "components/InfoDialog";
import ListSelector from "components/ListSelector/ListSelector";

import { ReactComponent as Logo } from "assets/logo.svg";

import { useSnackbar } from "components/Snackbar/SnackbarContext";

import { Theme } from "types";

import { THEME_KEY } from "config";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInfoDisplayed, setIsInfoDisplayed] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(Theme.Dark);

  useEffect(() => {
    const getTheme = (theme: string) =>
      theme === Theme.Light ? Theme.Light : Theme.Dark;

    // @ts-ignore
    const storageTheme = localStorage.getItem(THEME_KEY) || Theme.Light;

    setCurrentTheme(getTheme(storageTheme));

    dispatch({
      type: THEME_SET,
      payload: getTheme(storageTheme),
    });
  }, []);

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
          snackbar.setMessage({
            severity: "error",
            message: error.toString(),
          });
        }
      });
  };

  const handleThemeChange = () => {
    if (currentTheme === Theme.Light) {
      setCurrentTheme(Theme.Dark);
      localStorage.setItem(THEME_KEY, Theme.Dark);
      dispatch({
        type: THEME_SET,
        payload: Theme.Dark,
      });
    } else {
      setCurrentTheme(Theme.Light);
      localStorage.setItem(THEME_KEY, Theme.Light);
      dispatch({
        type: THEME_SET,
        payload: Theme.Light,
      });
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() =>
                setIsDrawerOpen((previousState: boolean) => !previousState)
              }
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ width: 80, mt: "4px", mr: 1 }}>
              <Logo />
            </Box>
          </Box>

          <HeaderSearchBar />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {currentTheme === Theme.Light ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}

            <Switch
              checked={currentTheme === Theme.Dark}
              onChange={handleThemeChange}
            />

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
    </>
  );
};

export default Header;
