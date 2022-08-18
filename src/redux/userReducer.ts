import { IAction } from "types";

import { USER_SET } from "./actions";

const initState: any = null;

// eslint-disable-next-line @typescript-eslint/default-param-last
const userReducer = (state: any = initState, action: IAction) => {
  switch (action.type) {
    case USER_SET:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
