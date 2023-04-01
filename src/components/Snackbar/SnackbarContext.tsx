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
