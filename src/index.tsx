import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "@store/store";
import GlobalStyles from "@styles/GlobalStyles";

render(
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);
