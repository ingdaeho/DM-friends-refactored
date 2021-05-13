import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./app/App";
import createStore from "@app/store";
import GlobalStyles from "@styles/GlobalStyles";

const store = createStore();

render(
  <BrowserRouter forceRefresh={true}>
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);
