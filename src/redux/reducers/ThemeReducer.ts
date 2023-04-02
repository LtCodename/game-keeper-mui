/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import type { Action } from "types";

import { Theme } from "types";

import { THEME_SET } from "../actions";

const initState: Theme = Theme.Light;

const ThemeReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initState,
  action: Action
) => {
  switch (action.type) {
    case THEME_SET:
      return action.payload;
    default:
      return state;
  }
};

export default ThemeReducer;
