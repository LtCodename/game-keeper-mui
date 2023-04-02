/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import React from "react";

import { Alert, Snackbar as MuiSnackbar } from "@mui/material";

import { useSnackbar } from "components/Snackbar/SnackbarContext";

const Snackbar = () => {
  const { message, setMessage } = useSnackbar();

  const handleClose = (e: any, reason: string) => {
    if (reason !== "clickaway") {
      // @ts-ignore
      setMessage(null);
    }
  };

  return (
    <MuiSnackbar
      autoHideDuration={6000}
      onClose={handleClose}
      open={Boolean(message) && Boolean(message.message)}
    >
      {message && message.severity && (
        <Alert
          severity={message.severity}
          sx={{
            width: "100%",
          }}
        >
          {message.message}
        </Alert>
      )}
    </MuiSnackbar>
  );
};

export default Snackbar;
