import { combineReducers } from "redux";
import userBlocksReducer from "./reducers/userBlocksReducer";
import userListsReducer from "./reducers/userListsReducer";
import userReducer from "./reducers/userReducer";
import userSectionsReducer from "./reducers/userSectionsReducer";

const rootReducer = combineReducers({
  userLists: userListsReducer,
  userSections: userSectionsReducer,
  userBlocks: userBlocksReducer,
  userData: userReducer,
});

export default rootReducer;
