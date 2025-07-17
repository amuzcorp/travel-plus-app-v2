import { createSlice } from "@reduxjs/toolkit";

export const GnbState = {
  Collapsed: 0,
  Expanded: 1,
};

export const gnbSlice = createSlice({
  name: "gnb",
  initialState: { value: GnbState.Collapsed },
  reducers: {
    expand: (state) => {
      state.value = GnbState.Expanded;
    },
    collapse: (state) => {
      state.value = GnbState.Collapsed;
    },
  },
});

export const { expand, collapse } = gnbSlice.actions;
