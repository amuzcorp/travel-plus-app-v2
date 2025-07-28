import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TVSystemInfo {
  modelName: string;
  firmwareVersion: string;
  isUHD: boolean;
  sdkVersion: string;
  boardType: string;
  isWebOS6: boolean;
}

interface TVSystemState {
  info: TVSystemInfo | null;
}

const initialState: TVSystemState = {
  info: null,
};

export const tvSystemSlice = createSlice({
  name: "tvSystem",
  initialState,
  reducers: {
    setTVSystemInfo(state, action: PayloadAction<TVSystemInfo>) {
      state.info = action.payload;
    },
  },
});

export const { setTVSystemInfo } = tvSystemSlice.actions;

export const selectTVSystemInfo = (state: { tvSystem: TVSystemState }) =>
  state.tvSystem.info;

export const selectIsWebOS6 = (state: { tvSystem: TVSystemState }) =>
  state.tvSystem.info?.isWebOS6 ?? false;
