import { useSelector } from "react-redux";
import { Banner } from "../entities/banner/Banner";
import { BannerState } from "../store/slices/bannerSlice";

// banner list를 인스턴스로 반환
export const useBannerList = (): Banner[] => {
  return useSelector((state: { banner: BannerState }) =>
    state.banner.bannerList.map((data) => Banner.fromReduxState(data))
  );
};
