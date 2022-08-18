import { combineReducers } from "redux";
import platformsReducer from "./platformsReducer";
import userBlocksReducer from "./userBlocksReducer";
import userListsReducer from "./userListsReducer";
import userReducer from "./userReducer";
import userSectionsReducer from "./userSectionsReducer";

const rootReducer = combineReducers({
  platforms: platformsReducer,
  userLists: userListsReducer,
  userSections: userSectionsReducer,
  userBlocks: userBlocksReducer,
  userData: userReducer,
  // selectedListIndex: selectedListIndexReducer.reducer,
});

export default rootReducer;
