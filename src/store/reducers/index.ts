import { combineReducers } from "redux";
import users from "@store/reducers/users";
import cart from "@store/reducers/cart";

const rootReducer = combineReducers({
  users,
  cart,
});

export default rootReducer;
