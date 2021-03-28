import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import GlobalStyles from "@styles/GlobalStyles";
import rootReducer from "@store/reducers";

const store = createStore(rootReducer);

render(
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);
