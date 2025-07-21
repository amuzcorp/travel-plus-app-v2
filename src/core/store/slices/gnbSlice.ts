import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const GnbState = {
  Collapsed: 0,
  Expanded: 1,
} as const;

export type GnbStateType = typeof GnbState[keyof typeof GnbState];

interface GnbStateInterface {
  value: GnbStateType;
  selectedIndex: number;
}

const initialState: GnbStateInterface = {
  value: GnbState.Collapsed,
  selectedIndex: 0
};

export const gnbSlice = createSlice({
  name: "gnb",
  initialState,
  reducers: {
    expand: (state) => {
      state.value = GnbState.Expanded;
    },
    collapse: (state) => {
      state.value = GnbState.Collapsed;
    },
    select: (state, action: PayloadAction<number>) => {
      state.selectedIndex = action.payload;
    },
  },
});

export const { expand, collapse, select } = gnbSlice.actions;