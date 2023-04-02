/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import type { Action, UserBlock } from "types";

import { BLOCKS_SET } from "../actions";

const initState: UserBlock[] = [];

// eslint-disable-next-line @typescript-eslint/default-param-last, import/prefer-default-export
export const UserBlocks = (state = initState, action: Action) => {
  switch (action.type) {
    case BLOCKS_SET:
      return action.payload;
    default:
      return state;
  }
};
