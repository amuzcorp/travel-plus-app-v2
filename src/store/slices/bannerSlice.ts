import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Banner } from "../../entities/banner/Banner";

export interface BannerState {
  bannerList: ReturnType<Banner["toReduxState"]>[];
}

const initialState: BannerState = {
  bannerList: [],
};

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    //Banner[] 인스턴스를 받아 순수 객체로 변환해 저장
    setBanners(state, action: PayloadAction<Banner[]>) {
      state.bannerList = action.payload.map((b) => b.toReduxState());
    },
  },
});

export const { setBanners } = bannerSlice.actions;
export default bannerSlice.reducer;

// 인스턴스로 다시 변환
export const selectBannerList = (state: { banner: BannerState }): Banner[] =>
  state.banner.bannerList.map((data) => Banner.fromReduxState(data));
