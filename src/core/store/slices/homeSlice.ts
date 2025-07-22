import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DefaultFocusInterface from "./defaultFocusInterface";

interface HomeStateInterface extends DefaultFocusInterface {}

const initialState: HomeStateInterface = {
  lastFocused: null,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setLastFocusedToNull: (state) => {
      state.lastFocused = null;
    },
    setLastFocused: (state, action: PayloadAction<string>) => {
      state.lastFocused = action.payload;
    },
  },
});

export const { setLastFocusedToNull, setLastFocused } = homeSlice.actions;
