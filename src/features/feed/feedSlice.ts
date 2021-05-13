import axios, { AxiosResponse } from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { IFeeds, IFeedState } from "./types";
import { RootState } from "@app/rootReducer";

export const initialState: IFeedState = {
  feeds: [] || null,
  isLoading: false,
  error: null,
  query: {
    limit: 5,
    offset: 0,
  },
};

const startLoading = (state: IFeedState) => {
  state.isLoading = true;
};

const loadingFailed = (state: IFeedState, action: PayloadAction<Error>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    getFeedsStart: startLoading,
    getFeedsFailure: loadingFailed,
    getFeedsSuccess(state, action) {
      state.feeds = state.feeds.concat(action.payload);
      state.isLoading = false;
    },
    addPage(state: IFeedState) {
      state.query.offset = state.query.limit + state.query.offset;
    },
  },
});

export const { getFeedsStart, getFeedsSuccess, getFeedsFailure, addPage } = feedSlice.actions;

export default feedSlice.reducer;

const token = sessionStorage.getItem("token");

axios.defaults.baseURL = process.env.REACT_APP_DEV_URL;
axios.defaults.headers.common["Authorization"] = token;
axios.defaults.headers.common["Content-Type"] = "application/json";

function getFeedAPI(query: { limit: number; offset: number }) {
  const { limit, offset } = query;
  return axios.get(`feeds?limit=${limit}&offset=${offset}`);
}

function* getFeedSaga() {
  try {
    const { query } = yield select((state: RootState) => state.feedSlice);
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
