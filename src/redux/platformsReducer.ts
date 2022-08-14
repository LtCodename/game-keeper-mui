import { IAction, IPlatform } from "types/types";

const initState: IPlatform[] = [];

const PLATFORMS_SET: string = "PLATFORMS_SET";

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

export default { reducer: platformsReducer, actions: { PLATFORMS_SET } };
