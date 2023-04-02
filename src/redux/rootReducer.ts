/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import { combineReducers } from "redux";

import {
  ThemeReducer,
  User,
  UserBlocks,
  UserLists,
  UserSections,
} from "./reducers";

const rootReducer = combineReducers({
  userLists: UserLists,
  userSections: UserSections,
  userBlocks: UserBlocks,
  userData: User,
  theme: ThemeReducer,
});

export default rootReducer;
