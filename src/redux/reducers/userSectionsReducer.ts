/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import { IAction, IUserSection } from "types";

import { SECTIONS_SET } from "../actions";

const initState: IUserSection[] = [];

const userSectionsReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: IUserSection[] = initState,
  action: IAction
) => {
  switch (action.type) {
    case SECTIONS_SET:
      return action.payload;
    default:
      return state;
  }
};

export default userSectionsReducer;
