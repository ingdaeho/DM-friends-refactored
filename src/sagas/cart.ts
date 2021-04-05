import { all, fork, put, call } from "redux-saga/effects";
import * as Eff from "redux-saga/effects";
import axios from "axios";
import {
  GET_CART_ITEM_REQUEST,
  GET_CART_ITEM_SUCCESS,
  GET_CART_ITEM_FAILURE,
  CHANGE_QUANTITY_REQUEST,
  CHANGE_QUANTITY_SUCCESS,
  CHANGE_QUANTITY_FAILURE,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  DELETE_SELECTED_ITEMS_REQUEST,
  DELETE_SELECTED_ITEMS_FAILURE,
  DELETE_SELECTED_ITEMS_SUCCESS,
} from "@store/reducers/cart";
import { cart, response } from "@typings/db";

const token = sessionStorage.getItem("token");

const headers = {
  authorization: token,
  "Content-Type": "application/json",
};

function getCartItemAPI(data: { user_id: number }) {
  const { user_id } = data;
  return axios.get(`users/${user_id}/cart`, {
    headers: {
      authorization: token,
    },
  });
}

function* getCartItem(action: { data: { user_id: number } }) {
  try {
    const response: response = yield call(getCartItemAPI, action.data);
    const cartData = response.data.map((item) => Object.assign({}, item, { selected: true }));
    yield put({ type: GET_CART_ITEM_SUCCESS, data: cartData });
  } catch (err) {
    console.error(err);
    yield put({ type: GET_CART_ITEM_FAILURE, error: err.response.data });
  }
}

function deleteCartItemAPI(data: { user_id: number; product_id: number | number[] }) {
  const { user_id, product_id } = data;
  return axios.delete(`/users/${user_id}/cart`, { data: product_id, headers });
}

function* deleteCartItem(action: { data: { user_id: number; product_id: any } }) {
  try {
    yield call(deleteCartItemAPI, action.data);
    yield put({ type: DELETE_ITEM_SUCCESS, data: action.data });
  } catch (err) {
    console.error(err);
    yield put({ type: DELETE_ITEM_FAILURE, error: err.response.data });
  }
}

function* deleteSelectedItems(action: { data: { user_id: number; product_id: number[] } }) {
  try {
    yield call(deleteCartItemAPI, action.data);
    yield put({ type: DELETE_SELECTED_ITEMS_SUCCESS, data: action.data });
  } catch (err) {
    console.error(err);
    yield put({ type: DELETE_SELECTED_ITEMS_FAILURE, error: err.response.data });
  }
}

function changeQuantityAPI(data: { user_id: number; cart_id: number; quantity: number }) {
  const { user_id, cart_id, quantity } = data;
  return axios.put(`/users/${user_id}/cart`, { cart_id, quantity: Number(quantity) }, { headers });
}

function* changeQuantity(action: { data: { cartItems: cart; quantity: number; cart_id: number; user_id: number } }) {
  try {
    yield call(changeQuantityAPI, action.data);
    yield put({ type: CHANGE_QUANTITY_SUCCESS, data: action.data.cartItems });
  } catch (err) {
    console.error(err);
    yield put({ type: CHANGE_QUANTITY_FAILURE, error: err.response.data });
  }
}

const takeLatest: any = Eff.takeLatest;

function* watchGetCartItem() {
  yield takeLatest(GET_CART_ITEM_REQUEST, getCartItem);
}

function* watchChangeQuantity() {
  yield takeLatest(CHANGE_QUANTITY_REQUEST, changeQuantity);
}

function* watchDeleteCartItem() {
  yield takeLatest(DELETE_ITEM_REQUEST, deleteCartItem);
  yield takeLatest(DELETE_SELECTED_ITEMS_REQUEST, deleteSelectedItems);
}

export default function* cartSaga() {
  yield all([fork(watchGetCartItem), fork(watchDeleteCartItem), fork(watchChangeQuantity)]);
}
