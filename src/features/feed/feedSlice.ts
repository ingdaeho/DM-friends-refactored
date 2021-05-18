import axios, { AxiosResponse } from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { IFeeds, IFeedState, IQuery } from "./types";
import { RootState } from "@app/rootReducer";

export const initialState: IFeedState = {
  feeds: [],
  isLoading: false,
  error: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    getFeedsStart(state: IFeedState, action: PayloadAction<IQuery>) {
      state.isLoading = true;
    },
    getFeedsFailure(state: IFeedState, action: PayloadAction<Error>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getFeedsSuccess(state, action) {
      state.feeds = state.feeds.concat(action.payload);
      state.isLoading = false;
    },
  },
});

export const { getFeedsStart, getFeedsSuccess, getFeedsFailure } = feedSlice.actions;

export default feedSlice.reducer;

const token = sessionStorage.getItem("token");

axios.defaults.baseURL = process.env.REACT_APP_DEV_URL;
axios.defaults.headers.common["Authorization"] = token;
axios.defaults.headers.common["Content-Type"] = "application/json";

function getFeedAPI(query: { limit: number; offset: number }) {
  const { limit, offset } = query;
  return axios.get(`feeds?limit=${limit}&offset=${offset}`);
}

function* getFeedSaga(action: PayloadAction<IQuery>) {
  try {
    const query = action.payload;
    const feeds: AxiosResponse<IFeeds> = yield call(getFeedAPI, query);
    yield put(getFeedsSuccess(feeds.data));
  } catch (err) {
    console.error(err);
    yield put(getFeedsFailure(err));
  }
}

export function* feedSaga() {
  yield takeLatest(getFeedsStart, getFeedSaga);
}
