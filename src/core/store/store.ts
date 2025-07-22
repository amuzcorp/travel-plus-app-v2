import { configureStore } from "@reduxjs/toolkit";
import { gnbSlice } from "./slices/gnbSlice";
import { homeSlice } from "./slices/homeSlice";

const store = configureStore({
  reducer: {
    gnb: gnbSlice.reducer,
    home: homeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
