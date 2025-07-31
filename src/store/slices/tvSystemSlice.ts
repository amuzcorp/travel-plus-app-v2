import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TvSystemInfo from "../../entities/global/TvSystemInfo";

interface TVSystemState {
  info: ReturnType<TvSystemInfo["toJson"]>;
}

const initialState: TVSystemState = {
  info: TvSystemInfo.empty().toJson(),
};

export const tvSystemSlice = createSlice({
  name: "tvSystem",
  initialState,
  reducers: {
    setTVSystemInfo(_, action: PayloadAction<TvSystemInfo>) {
      return {
        info: action.payload.toJson(),
      };
    },
  },
});

export const { setTVSystemInfo } = tvSystemSlice.actions;

export const selectTVSystemInfo = (state: { tvSystem: TVSystemState }) =>
  TvSystemInfo.fromJson(state.tvSystem.info);

export const selectIsWebOS6 = (state: { tvSystem: TVSystemState }) =>
  TvSystemInfo.fromJson(state.tvSystem.info).isWebOS6 ?? false;
