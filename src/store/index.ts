import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./slices/accountSlice";
import { dialogSlice } from "./slices/dialogSlice";
import { gnbSlice } from "./slices/gnbSlice";
import { homeSlice } from "./slices/homeSlice";
import { spinnerSlice } from "./slices/spinnerSlice";
import { tvSystemSlice } from "./slices/tvSystemSlice";

const store = configureStore({
  reducer: {
    gnb: gnbSlice.reducer,
    home: homeSlice.reducer,
    dialog: dialogSlice.reducer,
    spinner: spinnerSlice.reducer,
    tvSystem: tvSystemSlice.reducer,
    account: accountSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
