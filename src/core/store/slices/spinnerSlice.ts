import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SpinnerState {
  start: boolean;
  focusIdOnDismiss?: string | null;
}

const initialState: SpinnerState = {
  start: false,
  focusIdOnDismiss: null,
};

export const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    show: (
      state,
      action: PayloadAction<{
        focusIdOnDismiss?: string | null;
      }>
    ) => {
      state.start = true;
      state.focusIdOnDismiss = action.payload.focusIdOnDismiss ?? null;
    },
    hide: (state) => {
      state.start = false;
    },
  },
});

export const { show, hide } = spinnerSlice.actions;
export default spinnerSlice.reducer;
