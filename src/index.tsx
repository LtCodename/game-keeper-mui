import React from "react";

import ReactDOM from "react-dom/client";

import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import { applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";

import rootReducer from "redux/rootReducer";

import Loader from "components/Loader";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Loader />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
