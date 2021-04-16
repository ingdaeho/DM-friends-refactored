import { combineReducers } from "redux";
import userSlice from "@store/reducers/users";
import cart from "@store/reducers/cart";

const rootReducer = combineReducers({
  userSlice,
  cart,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
