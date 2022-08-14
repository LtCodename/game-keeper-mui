import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "components/dashboard/Dashboard";
import List from "components/list/List";
import Login from "components/login/Login";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "redux/rootReducer";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lists/:listId" element={<List />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<p>There is nothing here!</p>} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
