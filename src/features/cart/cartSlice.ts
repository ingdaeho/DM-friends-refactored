import axios, { AxiosResponse } from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { ICart, ICartRequest, ICartState, IDeleteRequest } from "./types";

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
    selectEachItem(state: ICartState, action: PayloadAction<number>) {
      state.cart = state.cart.map((item) =>
        item.id === action.payload ? { ...item, selected: !item.selected } : item,
      );
    },
    selectAllItem(state: ICartState) {
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
    deleteCartItemSuccess(state: ICartState, action: PayloadAction<number[]>) {
      state.cart = state.cart.filter((item) => !action.payload.includes(item.products.id));
      state.isLoading = false;
    },
    deleteSelectedItemsSuccess(state: ICartState) {
      state.isLoading = false;
    },
    changeQuantitySuccess(state: ICartState, action) {
      state.isLoading = false;
      // state.cartData = action.payload;
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
  selectEachItem,
  selectAllItem,
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

function changeQuantityAPI(payload: ICartRequest) {
  const { user_id, cart_id, quantity } = payload;
  return axios.put(`/users/${user_id}/cart`, { cart_id, quantity: Number(quantity) });
}

function* changeQuantitySaga(action: PayloadAction<ICartRequest>) {
  try {
    yield call(changeQuantityAPI, action.payload);
    yield put(changeQuantitySuccess(action.payload.quantity));
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
