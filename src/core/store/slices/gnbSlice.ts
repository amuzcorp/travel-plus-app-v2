import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { homeKeys } from "../../../core/constants/globalConstant";

export const GnbState = {
  Collapsed: 0,
  Expanded: 1,
} as const;

export type GnbStateType = (typeof GnbState)[keyof typeof GnbState];

interface GnbStateInterface {
  value: GnbStateType;
  selectedButton: string;
  lastEnterKey: string;
}

const initialState: GnbStateInterface = {
  value: GnbState.Collapsed,
  selectedButton: "home",
  lastEnterKey: homeKeys.carousel.containerKey,
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
    setLastEnterKey: (state, action: PayloadAction<string>) => {
      state.lastEnterKey = action.payload;
    },
  },
});

export const { expand, collapse, select, setLastEnterKey } = gnbSlice.actions;
