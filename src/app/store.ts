import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import rootReducer from "@app/rootReducer";
import { usersSaga } from "@features/users/userSlice";
import { cartSaga } from "@features/cart/cartSlice";
import { feedSaga } from "@features/feed/feedSlice";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([usersSaga(), cartSaga(), feedSaga()]);
}

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);
  return store;
};

export default createStore;
