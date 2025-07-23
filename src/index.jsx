/* global ENACT_PACK_ISOMORPHIC */

import { createRoot, hydrateRoot } from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import { theme } from "./core/styles/theme";
import Router from "./core/routes/Router";
import { Provider } from "react-redux";
import store from "./core/store/store";
import "./core/styles/fonts.css";

const appElement = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </Provider>
);

// In a browser environment, render instead of exporting
if (typeof window !== "undefined") {
  const container = document.getElementById("root");

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
