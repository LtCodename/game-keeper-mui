import { combineReducers } from "redux";
import platformsReducer from "./platformsReducer";
import userListsReducer from "./userListsReducer";

const rootReducer = combineReducers({
  platforms: platformsReducer,
  userLists: userListsReducer,
  // colors: colorsReducer.reducer,
  // userData: userReducer.reducer,
  // selectedListIndex: selectedListIndexReducer.reducer,
  // userSections: userSectionsReducer.reducer,
  // userBlocks: userBlocksReducer.reducer,
});

export default rootReducer;
