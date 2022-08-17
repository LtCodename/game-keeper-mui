import React from "react";

import ReactDOM from "react-dom/client";

import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import rootReducer from "redux/rootReducer";

import Header from "components/header/Header";
import Loader from "components/Loader";
import Dashboard from "components/Dashboard";
import List from "components/list/List";
import Login from "components/Login";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Loader />
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:listId" element={<List />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<p>There is nothing here!</p>} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
