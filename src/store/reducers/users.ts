import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@typings/db";

export const INITIAL_STATE: UserState = {
  signupLoading: false,
  signupDone: false,
  signupError: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
};

const userSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  reducers: {
    signupRequest(state, action) {
      state.signupLoading = true;
      state.signupDone = false;
    },
    signupSuccess(state, action) {
      state.signupLoading = false;
      state.signupDone = true;
    },
    signupFailure(state, action) {
      state.signupLoading = false;
      state.signupError = action.payload;
    },
    loginRequest(state, action) {
      state.loginLoading = true;
      state.loginDone = false;
    },
    loginSuccess(state, action) {
      state.loginLoading = false;
      state.loginDone = true;
    },
    loginFailure(state, action) {
      state.loginLoading = false;
      state.loginError = action.payload;
    },
    logoutRequest(state, action) {
      state.logoutLoading = true;
      state.logoutDone = false;
    },
    logoutSuccess(state, action) {
      state.logoutLoading = false;
      state.logoutDone = true;
    },
    logoutFailure(state, action) {
      state.logoutLoading = false;
      state.logoutError = action.payload;
    },
  },
});

export const {
  signupRequest,
  signupSuccess,
  signupFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = userSlice.actions;

export default userSlice.reducer;
