import React, { useState } from "react";

import { useTheme } from "@mui/material/styles";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  Stack,
} from "@mui/material/";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Link } from "react-router-dom";

import { IStore, IUserList } from "types";

import ListItem from "components/list/ListItem";

import { useSelector } from "react-redux";

import DRAWER_WIDTH from "constants";

import {
  DrawerHeader,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./styles";

const Header = () => {
  const [isDrawerOpen, setisDrawerOpen] = useState<boolean>(false);

  const theme = useTheme();
  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  const toggleDrawer = () => {
    setisDrawerOpen((previousState: boolean) => !previousState);
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
                <DashboardIcon />
              </IconButton>
            </Link>
            <IconButton aria-label="logout" color="inherit">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
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
        open={isDrawerOpen}
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
          <IconButton onClick={toggleDrawer}>
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
            <ListItem key={list.id} {...list} />
          ))}
        </Stack>
      </Drawer>
    </Box>
  );
};

export default Header;
