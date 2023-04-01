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

import { Provider } from "react-redux";

import { applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";

import rootReducer from "redux/rootReducer";

import ThemeRender from "ThemeRender";

const store = createStore(rootReducer, applyMiddleware(thunk));

const StoreRender = () => (
  <Provider store={store}>
    <ThemeRender />
  </Provider>
);

export default StoreRender;
