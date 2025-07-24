import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const GnbState = {
  Collapsed: 0,
  Expanded: 1,
} as const;

export type GnbStateType = (typeof GnbState)[keyof typeof GnbState];

interface GnbStateInterface {
  value: GnbStateType;
  selectedButton: string;
  wantToCollapse: boolean;
}

const initialState: GnbStateInterface = {
  value: GnbState.Collapsed,
  selectedButton: "home",
  wantToCollapse: false,
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
    updateWantToCollapse: (state, action: PayloadAction<boolean>) => {
      state.wantToCollapse = action.payload;
    },
  },
});

export const { expand, collapse, select, updateWantToCollapse } =
  gnbSlice.actions;
