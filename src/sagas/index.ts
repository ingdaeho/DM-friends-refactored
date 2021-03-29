import { all, fork } from "redux-saga/effects";
import axios from "axios";
import userSaga from "@sagas/users";

axios.defaults.baseURL = process.env.REACT_APP_DEV_URL;
// axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga)]);
}
