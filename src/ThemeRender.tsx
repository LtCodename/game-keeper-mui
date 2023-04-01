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

import Loader from "components/Loader";

import { ThemeProvider } from "@mui/material/styles";

import Snackbar from "components/Snackbar/Snackbar";

import { SnackbarProvider } from "components/Snackbar/SnackbarContext";

import { SnackbarMessage, Store, Theme } from "types";

import { Dark, Light } from "themes";

const ThemeRender = () => {
  const [message, setMessage] = useState<SnackbarMessage>();

  const theme = useSelector((state: Store) => state.theme) || null;

  const snackbarData = {
    message,
    setMessage,
  };

  return (
    <ThemeProvider theme={theme === Theme.Light ? Light : Dark}>
      {/* @ts-ignore */}
      <SnackbarProvider value={snackbarData}>
        <Loader />
        <Snackbar />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default ThemeRender;
