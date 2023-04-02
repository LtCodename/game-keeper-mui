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

import ReactDOM from "react-dom/client";

import "./index.css";

import { BrowserRouter } from "react-router-dom";

import StoreRender from "StoreRender";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <StoreRender />
  </BrowserRouter>
);
