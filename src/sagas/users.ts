import { all, fork, put, call, CallEffect, PutEffect } from "redux-saga/effects";
import * as Eff from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE,
} from "@store/reducers/users";
import { singUpData, logInData } from "@typings/db";

function signUpAPI(data: singUpData) {
  return axios.post("/users/signup", data);
}

function* signUp(action: {
  data: singUpData;
}): Generator<
  | CallEffect<AxiosResponse<any>>
  | PutEffect<{
      type: string;
    }>,
  void,
  unknown
> {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({ type: SIGNUP_SUCCESS });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

function logInAPI(data: logInData) {
  return axios.post("/users/login", data);
}

function* storeToken(response: any): Generator<void, void, unknown> {
  try {
    yield sessionStorage.setItem("token", response.data.token);
  } catch (error) {
    console.log(error);
  }
}

function* logIn(action: {
  data: logInData;
}): Generator<
  | CallEffect<AxiosResponse<any>>
  | CallEffect<Generator<void, void, unknown>>
  | PutEffect<{
      type: string;
      data: any;
    }>
  | PutEffect<{ type: string }>,
  void,
  string
> {
  try {
    const response = yield call(logInAPI, action.data);
    yield call<(token: string) => Generator<void, void, unknown>>(storeToken, response);
    yield put({
      type: LOGIN_SUCCESS,
      data: response,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

function userInfoAPI(): Promise<AxiosResponse<any>> {
  const token = sessionStorage.getItem("token");
  return axios.get("/users", {
    headers: {
      authorization: `${token}`,
    },
  });
}

function* userInfo(): Generator<
  | CallEffect<AxiosResponse<any>>
  | PutEffect<{
      type: string;
      data: any;
    }>
  | PutEffect<{
      type: string;
      error: any;
    }>,
  void,
  unknown
> {
  try {
    const result = yield call(userInfoAPI);
    yield put({
      type: USER_INFO_SUCCESS,
      data: result,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_INFO_FAILURE,
      error: err.result.data,
    });
  }
}

const takeLatest: any = Eff.takeLatest;

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

function* watchLogIn() {
  yield takeLatest(LOGIN_REQUEST, logIn);
}

function* watchUserInfo() {
  yield takeLatest(USER_INFO_REQUEST, userInfo);
}

export default function* usersSaga() {
  yield all([fork(watchSignUp), fork(watchLogIn), fork(watchUserInfo)]);
}
