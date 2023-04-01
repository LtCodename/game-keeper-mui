import React from "react";

import { SnackbarMessage } from "types";

interface Params {
  message: SnackbarMessage;
  setMessage(message: SnackbarMessage): any;
}

// @ts-ignore
const SnackbarContext = React.createContext<Params>(null);

export const SnackbarProvider = SnackbarContext.Provider;

export const useSnackbar = () => React.useContext(SnackbarContext);

export default SnackbarContext;
