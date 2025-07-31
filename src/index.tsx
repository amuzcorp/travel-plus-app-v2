import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import "./_App/App.module.css";
import ApiProviders from "./api/ApiProvider";
import Dialog from "./components/Popups/Dialog";
import Spinner from "./components/Spinner/Spinner";
import reportWebVitals from "./reportWebVitals";
import Router from "./routes/Router";
import store from "./store";
import "./styles/fonts.css";
import { theme } from "./styles/theme";

const appElement = (
  <ApiProviders>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router />
        <Spinner />
        <Dialog />
      </ThemeProvider>
    </Provider>
  </ApiProviders>
);

if (typeof window !== "undefined") {
  const container = document.getElementById("root");

  // if (ENACT_PACK_ISOMORPHIC) {
  // if(false) {}
  // hydrateRoot(container, appElement);
  // } else {
  createRoot(container!).render(appElement);
  // }
}

export default appElement;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint.
// Learn more: https://github.com/enactjs/cli/blob/master/docs/measuring-performance.md
reportWebVitals();
