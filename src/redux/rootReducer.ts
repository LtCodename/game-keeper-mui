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

import ThemeReducer from "./reducers/ThemeReducer";
import UserBlocksReducer from "./reducers/UserBlocksReducer";
import UserListsReducer from "./reducers/UserListsReducer";
import UserReducer from "./reducers/UserReducer";
import UserSectionsReducer from "./reducers/UserSectionsReducer";

const rootReducer = combineReducers({
  userLists: UserListsReducer,
  userSections: UserSectionsReducer,
  userBlocks: UserBlocksReducer,
  userData: UserReducer,
  theme: ThemeReducer,
});

export default rootReducer;
