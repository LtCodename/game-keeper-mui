import React, { useState } from "react";

import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material/";

import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import { Link, useNavigate } from "react-router-dom";

import ListSelector from "components/ListSelector/ListSelector";

import { getAuth, signOut } from "firebase/auth";

import { BLOCKS_SET, LISTS_SET, SECTIONS_SET, USER_SET } from "redux/actions";

import { useDispatch } from "react-redux";

import { Search, SearchIconWrapper, StyledInputBase } from "./styles";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((previousState: boolean) => !previousState);
  };

  const clearStore = (): void => {
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

  const logout = (): void => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/login", { replace: true });
        setTimeout(() => {
          clearStore();
        }, 100);
      })
      .catch((error: any) => {
        console.log(error);
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
          <Search sx={{ minWidth: { xs: "auto", sm: "300px" } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              to="/"
              style={{
                color: "inherit",
              }}
            >
              <IconButton aria-label="dashboard" color="inherit">
                <HomeIcon />
              </IconButton>
            </Link>
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
    </Box>
  );
};

export default Header;
