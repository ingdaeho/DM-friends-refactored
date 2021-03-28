import { all, fork } from "redux-saga/effects";
import axios from "axios";
// import userSaga from "@sagas/users";
import { API } from "../../config";

axios.defaults.baseURL = API;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  // yield all([fork(userSaga)]);
}
