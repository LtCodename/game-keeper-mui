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

import ReactDOM from "react-dom/client";

import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import { applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";

import rootReducer from "redux/rootReducer";

import Loader from "components/Loader";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Snackbar from "components/Snackbar/Snackbar";

import { SnackbarProvider } from "components/Snackbar/SnackbarContext";

import { SnackbarMessage } from "types";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = createStore(rootReducer, applyMiddleware(thunk));

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f9a825",
    },
  },
});

const Render = () => {
  const [message, setMessage] = useState<SnackbarMessage>();

  const snackbarData = {
    message,
    setMessage,
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          {/* @ts-ignore */}
          <SnackbarProvider value={snackbarData}>
            <Loader />
            <Snackbar />
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

root.render(<Render />);

reportWebVitals();
