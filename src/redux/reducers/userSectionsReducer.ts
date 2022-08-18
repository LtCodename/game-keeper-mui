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
