import axios, { AxiosResponse } from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ICart, ICartRequest, ICartState, ICheckbox } from "./types";

export const initialState: ICartState = {
  cart: [] || null,
  isLoading: false,
  error: null,
  selectAll: true,
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
    deleteSelectedItemsRequest: startLoading,
    deleteSelectedItemsFailure: loadingFailed,
    changeQuantityRequest: startLoading,
    changeQuantityFailure: loadingFailed,
    getCartItemSuccess(state: ICartState, action) {
      state.isLoading = false;
      state.cart = action.payload;
    },
    deleteCartItemSuccess(state: ICartState, action) {
      state.isLoading = false;
      // state.cartData = state.cartData?.filter((item) => item.id !== action.payload.cart_id);
    },
    deleteSelectedItemsSuccess(state: ICartState, action) {
      state.isLoading = false;
    },
    changeQuantitySuccess(state: ICartState, action) {
      state.isLoading = false;
      // state.cartData = action.payload;
    },
    selectAllRequest(state: ICartState, action) {
      state.selectAll = state.cart?.reduce((result: boolean, item: ICart) => (result = result && item.selected), true);
    },
    selectAllSuccess(state: ICartState, action) {
      state.selectAll = action.payload;
    },
    selectEach(state: ICartState, action) {
      state.cart = state.cart;
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
  deleteSelectedItemsRequest,
  deleteSelectedItemsSuccess,
  deleteSelectedItemsFailure,
  changeQuantityRequest,
  changeQuantitySuccess,
  changeQuantityFailure,
  selectAllRequest,
  selectAllSuccess,
  selectEach,
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

function deleteCartItemAPI(payload: ICartRequest) {
  const { user_id, product_id } = payload;
  return axios.delete(`/users/${user_id}/cart`, { data: product_id });
}

function* deleteCartItem(action: PayloadAction<ICartRequest>) {
  try {
    yield call(deleteCartItemAPI, action.payload);
    yield put(deleteCartItemSuccess(action.payload));
  } catch (err) {
    console.error(err);
    yield put(deleteCartItemFailure(err));
  }
}

function* deleteSelectedItems(action: PayloadAction<ICartRequest>) {
  try {
    yield call(deleteCartItemAPI, action.payload);
    yield put(deleteSelectedItemsSuccess(action.payload));
  } catch (err) {
    console.error(err);
    yield put(deleteSelectedItemsFailure(err));
  }
}

function changeQuantityAPI(payload: ICartRequest) {
  const { user_id, cart_id, quantity } = payload;
  return axios.put(`/users/${user_id}/cart`, { cart_id, quantity: Number(quantity) });
}

function* changeQuantity(action: PayloadAction<ICartRequest>) {
  try {
    yield call(changeQuantityAPI, action.payload);
    yield put(changeQuantitySuccess(action.payload.quantity));
  } catch (err) {
    console.error(err);
    yield put(changeQuantityFailure(err));
  }
}

// function* select(action: PayloadAction<Checkbox>) {
//   const { selectedAll, cartData } = action.payload;
//   try {
//     const a = selectedAll
//       ? cartData?.map((item) => (item.selected = false))
//       : cartData?.map((item) => (item.selected = true));
//     yield put(selectAllRequest(a));
//   } catch (err) {
//     console.error(err);
//   }
// }

function filter(payload: ICheckbox) {
  const { cartData, id } = payload;
  for (let item of cartData) {
    if (item.id === id) {
      item.selected = !item.selected;
    }
  }
}

function* selectEachfuction(action: PayloadAction<ICheckbox>) {
  const { id, cartData } = action.payload;
  try {
    console.log(action.payload);
    yield call(filter, action.payload);
    // yield put(selectEach(action.payload));
  } catch (err) {
    console.error(err);
  }
}

function* watchselectEach() {
  yield takeEvery(selectEach, selectEachfuction);
}

// function* watchSelectAll() {
//   yield takeEvery(selectAllRequest, select);
// }

// function* watchGetCartItem() {
//   yield takeLatest(getCartItemRequest, getCartItem);
// }

function* watchChangeQuantity() {
  yield takeLatest(changeQuantityRequest, changeQuantity);
}

function* watchDeleteCartItem() {
  yield takeLatest(deleteCartItemRequest, deleteCartItem);
  yield takeLatest(deleteSelectedItemsRequest, deleteSelectedItems);
}

export function* cartSaga() {
  yield takeLatest(getCartItemRequest, getCartItemSaga);
}
