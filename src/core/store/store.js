import { configureStore } from "@reduxjs/toolkit";
import { gnbSlice } from "./slices/gnbSlice";

const store = configureStore({
  reducer: {
    gnb: gnbSlice.reducer,
  },
});

export default store;
