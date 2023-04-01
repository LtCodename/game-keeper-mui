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

import { Snackbar } from "@mui/material";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

// eslint-disable-next-line prefer-arrow-callback
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  message: string;
  onClose: () => void;
  isError?: boolean;
  open: boolean;
}

const Toast = ({ onClose, message, isError = false, open }: Props) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
    <Alert
      onClose={onClose}
      severity={isError ? "error" : "success"}
      sx={{ width: "100%" }}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default Toast;
