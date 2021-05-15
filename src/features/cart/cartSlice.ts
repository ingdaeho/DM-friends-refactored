import axios, { AxiosResponse } from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { ICart, ICartRequest, ICartState, IChangeQuantityRequest, IDeleteRequest } from "./types";

export const initialState: ICartState = {
  cart: [],
  isLoading: false,
  error: null,
};

const startLoading = (state: ICartState, action: PayloadAction<any>) => {
  state.isLoading = true;
};

const loadingFailed = (state: ICartState, action: PayloadAction<Error>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartItemRequest: startLoading,
    getCartItemFailure: loadingFailed,
    deleteCartItemRequest: startLoading,
    deleteCartItemFailure: loadingFailed,
    changeQuantityRequest: startLoading,
    changeQuantityFailure: loadingFailed,
    getCartItemSuccess(state: ICartState, action: PayloadAction<ICart[]>) {
      state.isLoading = false;
      state.cart = action.payload;
    },
    deleteCartItemSuccess(state: ICartState, action: PayloadAction<number[]>) {
      state.cart = state.cart.filter((item) => !action.payload.includes(item.products.id));
      state.isLoading = false;
    },
    changeQuantitySuccess(state: ICartState, action: PayloadAction<{ [key: string]: number }>) {
      state.isLoading = false;
      const target = state.cart.find((item) => item.id === action.payload.cart_id);
      if (target) target.quantity = action.payload.quantity;
    },
    selectCartItem(state: ICartState, action: PayloadAction<number>) {
      state.cart = state.cart.map((item) =>
        item.id === action.payload ? { ...item, selected: !item.selected } : item,
      );
    },
    selectAllCartItem(state: ICartState) {
      state.cart = state.cart.reduce((result, item) => (result = result && item.selected), true)
        ? state.cart.map((item) => {
            item.selected = false;
            return item;
          })
        : state.cart.map((item) => {
            item.selected = true;
            return item;
          });
    },
  },
});

export const {
  getCartItemRequest,
  getCartItemSuccess,
  getCartItemFailure,
  deleteCartItemRequest,
  deleteCartItemSuccess,
  deleteCartItemFailure,
  changeQuantityRequest,
  changeQuantitySuccess,
  changeQuantityFailure,
  selectCartItem,
  selectAllCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
const token = sessionStorage.getItem("token");

axios.defaults.baseURL = process.env.REACT_APP_DEV_URL;
axios.defaults.headers.common["Authorization"] = token;
axios.defaults.headers.common["Content-Type"] = "application/json";

function getCartItemAPI(payload: ICartRequest) {
  const { user_id } = payload;
  return axios.get(`users/${user_id}/cart`);
}

function* getCartItemSaga(action: PayloadAction<ICartRequest>) {
  try {
    const response: AxiosResponse<ICart[]> = yield call(getCartItemAPI, action.payload);
    const cartData = response.data.map((item) => Object.assign({}, item, { selected: true }));
    yield put(getCartItemSuccess(cartData));
  } catch (err) {
    console.error(err);
    yield put(getCartItemFailure(err));
  }
}

function deleteCartItemAPI(payload: IDeleteRequest) {
  const { user_id, product_id } = payload;
  return axios.delete(`/users/${user_id}/cart`, { data: product_id });
}

function* deleteCartItemSaga(action: PayloadAction<IDeleteRequest>) {
  const { product_id } = action.payload;
  try {
    yield call(deleteCartItemAPI, action.payload);
    const idArr: number[] = product_id.map((product_id) => Object.values(product_id)).flat();
    yield put(deleteCartItemSuccess(idArr));
  } catch (err) {
    console.error(err);
    yield put(deleteCartItemFailure(err));
  }
}

function changeQuantityAPI(payload: IChangeQuantityRequest) {
  const { user_id, cart_id, quantity } = payload;
  return axios.put(`/users/${user_id}/cart`, { cart_id, quantity: Number(quantity) });
}

function* changeQuantitySaga(action: PayloadAction<IChangeQuantityRequest>) {
  const { quantity, cart_id } = action.payload;
  try {
    yield call(changeQuantityAPI, action.payload);
    yield put(changeQuantitySuccess({ quantity, cart_id }));
  } catch (err) {
    console.error(err);
    yield put(changeQuantityFailure(err));
  }
}

export function* cartSaga() {
  yield takeLatest(getCartItemRequest, getCartItemSaga);
  yield takeLatest(changeQuantityRequest, changeQuantitySaga);
  yield takeLatest(deleteCartItemRequest, deleteCartItemSaga);
}
