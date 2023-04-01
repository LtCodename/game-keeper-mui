/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import type { Action, UserList } from "types";

import { LISTS_SET } from "../actions";

const initState: UserList[] = [];

// eslint-disable-next-line @typescript-eslint/default-param-last
const UserListsReducer = (state = initState, action: Action) => {
  switch (action.type) {
    case LISTS_SET:
      return action.payload;
    default:
      return state;
  }
};

export default UserListsReducer;
