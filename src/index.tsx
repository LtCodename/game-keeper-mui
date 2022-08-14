import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "components/dashboard/Dashboard";
import Lists from "components/lists/Lists";
import List from "components/list/List";
import Login from "components/auth/Login";
import Signup from "components/auth/Signup";
import Reset from "components/auth/Reset";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="lists" element={<Lists />} />
        <Route path="/lists/:listId" element={<List />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="reset" element={<Reset />} />
        <Route path="*" element={<p>There is nothing here!</p>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
