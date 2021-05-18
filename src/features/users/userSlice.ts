import axios, { AxiosResponse } from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { IUserState, ILogin, ISignup, IResponse } from "@features/users/types";

export const initialState: IUserState = {
  isLoading: false,
  error: null,
  signupDone: false,
  loginDone: false,
};

const startLoading = (state: IUserState, action: PayloadAction<any>) => {
  state.isLoading = true;
};

const loadingFailed = (state: IUserState, action: PayloadAction<Error>) => {
  state.isLoading = false;
  state.error = action.payload;
  state.loginDone = false;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupRequest: startLoading,
    signupFailure: loadingFailed,
    loginRequest: startLoading,
    loginFailure: loadingFailed,
    logoutRequest: startLoading,
    logoutFailure: loadingFailed,
    signupSuccess(state: IUserState) {
      state.isLoading = false;
      state.signupDone = true;
    },
    loginSuccess(state: IUserState) {
      state.isLoading = false;
      state.loginDone = true;
    },
    logoutSuccess(state: IUserState) {
      state.isLoading = false;
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

axios.defaults.baseURL = process.env.REACT_APP_DEV_URL;

function signUpAPI(payload: ISignup) {
  return axios.post("/users/signup", payload);
}

function* signUpSaga(action: PayloadAction<ISignup>) {
  try {
    yield call(signUpAPI, action.payload);
    yield put(signupSuccess());
  } catch (err) {
    console.error(err);
    yield put(signupFailure(err));
  }
}

function logInAPI(payload: ILogin) {
  return axios.post("/users/login", payload);
}

function* logInSaga(action: PayloadAction<ILogin>) {
  try {
    const response: AxiosResponse<IResponse> = yield call(logInAPI, action.payload);
    yield sessionStorage.setItem("token", response.data.token);
    yield put(loginSuccess());
  } catch (err) {
    console.error(err);
    yield put(loginFailure(err));
  }
}

function* logOutSaga() {
  try {
    yield sessionStorage.removeItem("token");
    yield put(logoutSuccess());
  } catch (err) {
    console.error(err);
    yield put(logoutFailure(err));
  }
}

export function* usersSaga() {
  yield takeLatest(signupRequest, signUpSaga);
  yield takeLatest(loginRequest, logInSaga);
  yield takeLatest(logoutRequest, logOutSaga);
}
