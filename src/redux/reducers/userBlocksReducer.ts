/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import { IAction, IUserBlock } from "types";

import { BLOCKS_SET } from "../actions";

const initState: IUserBlock[] = [];

const userBlocksReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: IUserBlock[] = initState,
  action: IAction
) => {
  switch (action.type) {
    case BLOCKS_SET:
      return action.payload;
    default:
      return state;
  }
};

export default userBlocksReducer;
