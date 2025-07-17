import { createSlice } from "@reduxjs/toolkit";

export const GnbState = {
  Collapsed: 0,
  Expanded: 1,
};

export const gnbSlice = createSlice({
  name: "gnb",
  initialState: { value: GnbState.Collapsed, selectedIndex: 0 },
  reducers: {
    expand: (state) => {
      state.value = GnbState.Expanded;
    },
    collapse: (state) => {
      state.value = GnbState.Collapsed;
    },
    select: (state, action) => {
      state.selectedIndex = action.payload;
    },
  },
});

export const { expand, collapse, select } = gnbSlice.actions;
