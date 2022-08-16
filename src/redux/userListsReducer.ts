import { IAction, IUserList } from "types/types";

import { LISTS_SET } from "./actions";

const initState: IUserList[] = [];

// eslint-disable-next-line @typescript-eslint/default-param-last
const userListsReducer = (state: IUserList[] = initState, action: IAction) => {
  switch (action.type) {
    case LISTS_SET:
      return action.payload;
    default:
      return state;
  }
};

export default userListsReducer;
