import { combineReducers } from "redux";
import platformsReducer from "./platformsReducer";

const rootReducer = combineReducers({
  // colors: colorsReducer.reducer,
  // userData: userReducer.reducer,
  // selectedListIndex: selectedListIndexReducer.reducer,
  platforms: platformsReducer.reducer,
  // userLists: userListsReducer.reducer,
  // userSections: userSectionsReducer.reducer,
  // userBlocks: userBlocksReducer.reducer,
});

export default rootReducer;
