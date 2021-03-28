import { deflate } from "node:zlib";
import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from "@store/reducers";
import rootSaga from "@sagas/index";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
