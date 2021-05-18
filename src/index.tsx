import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./app/App";
import createStore from "@app/store";
import GlobalStyles from "@styles/GlobalStyles";
import theme from "@styles/GlobalStyles";
import { ThemeProvider } from "styled-components";

const store = createStore();

render(
  <BrowserRouter forceRefresh={true}>
    <ThemeProvider theme={theme} />
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);
