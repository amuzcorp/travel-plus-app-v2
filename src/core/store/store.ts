import { configureStore } from "@reduxjs/toolkit";
import { gnbSlice } from "./slices/gnbSlice";

const store = configureStore({
  reducer: {
    gnb: gnbSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;