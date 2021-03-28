import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "@store/reducers/users";

// function signUpAPI(data) {
//   return axios.post("/users/signup", data);
// }

// function* signUp(action) {
//   try {
//     const result = yield call(signUpAPI, action.data);
//     console.log(result);
//     yield put({ type: SIGNUP_SUCCESS });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: SIGNUP_FAILURE,
//       error: err.response.data,
//     });
//   }
// }

// function logInAPI(data) {
//   return axios.post("/users/login", data);
// }

// function* logIn(action) {
//   try {
//     const result = yield call(logInAPI, action.data);
//     yield put({
//       type: LOGIN_SUCCESS,
//       data: result.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: LOGIN_FAILURE,
//       error: err.response.data,
//     });
//   }
// }

// function* watchSignUp() {
//   yield takeLatest(SIGNUP_REQUEST, signUp);
// }

// function* watchLogIn() {
//   yield takeLatest(LOGIN_REQUEST, logIn);
// }

// export default function* usersSaga() {
//   yield all([fork(watchSignUp), fork(watchLogIn)]);
// }
