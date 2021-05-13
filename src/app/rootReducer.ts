import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "@features/users/userSlice";
import cartSlice from "@features/cart/cartSlice";

const rootReducer = combineReducers({ userSlice, cartSlice });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
