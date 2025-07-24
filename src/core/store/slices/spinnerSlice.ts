import { createSlice } from "@reduxjs/toolkit";

interface SpinnerState {
  start: boolean;
}

const initialState: SpinnerState = {
  start: false,
};

export const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    show: (state) => {
      state.start = true;
    },
    hide: (state) => {
      state.start = false;
    },
  },
});

export const { show, hide } = spinnerSlice.actions;
export default spinnerSlice.reducer;
