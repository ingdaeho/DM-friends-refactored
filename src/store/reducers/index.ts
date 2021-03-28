import { combineReducers } from "redux";
import users from "@store/reducers/users";

const rootReducer = combineReducers({
  users,
});

export default rootReducer;
