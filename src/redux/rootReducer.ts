import { combineReducers } from "redux";
import platformsReducer from "./platformsReducer";
import userListsReducer from "./userListsReducer";
import userSectionsReducer from "./userSectionsReducer";

const rootReducer = combineReducers({
  platforms: platformsReducer,
  userLists: userListsReducer,
  userSections: userSectionsReducer,
  // colors: colorsReducer.reducer,
  // userData: userReducer.reducer,
  // selectedListIndex: selectedListIndexReducer.reducer,
  // userBlocks: userBlocksReducer.reducer,
});

export default rootReducer;
