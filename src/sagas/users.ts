import { all, fork, put, call, CallEffect, PutEffect, ForkEffect } from "redux-saga/effects";
import * as Eff from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "@store/reducers/users";

interface singUpData {
  email: string;
  paswword: string;
  confirm_password: string;
  nickname: string;
}

interface logInData {
  email: string;
  password: string;
}

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
    console.log(result);
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

function* logIn(action: {
  data: logInData;
}): Generator<
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
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: result,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
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

export default function* usersSaga() {
  yield all([fork(watchSignUp), fork(watchLogIn)]);
}
