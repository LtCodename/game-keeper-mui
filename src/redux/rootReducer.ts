import { combineReducers } from "redux";
import platformsReducer from "./platformsReducer";
import userListsReducer from "./userListsReducer";

const rootReducer = combineReducers({
  // colors: colorsReducer.reducer,
  // userData: userReducer.reducer,
  // selectedListIndex: selectedListIndexReducer.reducer,
  platforms: platformsReducer,
  userLists: userListsReducer,
  // userSections: userSectionsReducer.reducer,
  // userBlocks: userBlocksReducer.reducer,
});

export default rootReducer;
