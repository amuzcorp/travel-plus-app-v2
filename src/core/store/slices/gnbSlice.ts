import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const GnbState = {
  Collapsed: 0,
  Expanded: 1,
} as const;

export type GnbStateType = (typeof GnbState)[keyof typeof GnbState];

interface GnbStateInterface {
  value: GnbStateType;
  selectedButton: string;
}

const initialState: GnbStateInterface = {
  value: GnbState.Collapsed,
  selectedButton: "home",
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
    select: (state, action: PayloadAction<string>) => {
      state.selectedButton = action.payload;
    },
  },
});

export const { expand, collapse, select } = gnbSlice.actions;
