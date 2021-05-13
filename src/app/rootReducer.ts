import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "@features/users/userSlice";
import cartSlice from "@features/cart/cartSlice";
import feedSlice from "@features/feed/feedSlice";

const rootReducer = combineReducers({ userSlice, cartSlice, feedSlice });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
