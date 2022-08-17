import { IAction, IPlatform } from "types";

import { PLATFORMS_SET } from "./actions";

const initState: IPlatform[] = [];

// eslint-disable-next-line @typescript-eslint/default-param-last
const platformsReducer = (state: IPlatform[] = initState, action: IAction) => {
  const nextState: IPlatform[] = [];

  switch (action.type) {
    case PLATFORMS_SET:
      action.payload.forEach((doc: any) => {
        const data: any = doc.data();
        nextState.push({
          ...data,
        });
      });
      return nextState;
    default:
      return state;
  }
};

export default platformsReducer;
