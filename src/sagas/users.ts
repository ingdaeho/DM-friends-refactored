import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  signupRequest,
  signupSuccess,
  signupFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from "@store/reducers/users";
import { singUpData, logInData, UserResponse } from "@typings/db";
import { PayloadAction } from "@reduxjs/toolkit";

function signUpAPI(data: singUpData) {
  return axios.post("/users/signup", data);
}

function* signUp(action: PayloadAction<singUpData>) {
  try {
    const result: UserResponse = yield call(signUpAPI, action.payload);
    yield put(signupSuccess(result));
  } catch (err) {
    console.error(err);
    yield put(signupFailure(err));
  }
}

function logInAPI(data: logInData) {
  return axios.post("/users/login", data);
}

function* storeToken(response: any): Generator<void, void, unknown> {
  try {
    yield sessionStorage.setItem("token", response.data.token);
  } catch (err) {
    console.error(err);
  }
}
function* logIn(action: PayloadAction<logInData>) {
  try {
    const response: UserResponse = yield call(logInAPI, action.payload);
    yield call(storeToken, response);
    yield put(loginSuccess(response));
  } catch (err) {
    console.error(err);
    yield put(loginFailure(err));
  }
}

function* logOut() {
  try {
    yield sessionStorage.removeItem("token");
    yield put(logoutSuccess);
  } catch (err) {
    console.error(err);
    yield put(logoutFailure(err));
  }
}

function* watchSignUp() {
  yield takeLatest(signupRequest, signUp);
}

function* watchLogIn() {
  yield takeLatest(loginRequest, logIn);
}

function* watchLogOut() {
  yield takeLatest(logoutRequest, logOut);
}

export default function* usersSaga() {
  yield all([fork(watchSignUp), fork(watchLogIn), fork(watchLogOut)]);
}
