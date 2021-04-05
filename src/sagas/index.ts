import { all, fork } from "redux-saga/effects";
import axios from "axios";
import userSaga from "@sagas/users";
import cartSaga from "@sagas/cart";

axios.defaults.baseURL = process.env.REACT_APP_DEV_URL;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(cartSaga)]);
}
