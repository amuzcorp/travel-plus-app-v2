import { createRoot, hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import "./App/App.module.css";
import Dialog from "./components/Popups/Dialog";
import Spinner from "./components/Spinner/Spinner";
import Router from "./core/routes/Router";
import store from "./core/store/store";
import "./core/styles/fonts.css";
import { theme } from "./core/styles/theme";
import reportWebVitals from "./reportWebVitals";

const appElement = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router />
      <Spinner />
      <Dialog />
    </ThemeProvider>
  </Provider>
);

if (typeof window !== "undefined") {
  const container = document.getElementById("root");

  localStorage.clear();

  if (ENACT_PACK_ISOMORPHIC) {
    hydrateRoot(container, appElement);
  } else {
    createRoot(container).render(appElement);
  }
}

export default appElement;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint.
// Learn more: https://github.com/enactjs/cli/blob/master/docs/measuring-performance.md
reportWebVitals();
