import BannerItem from "../../entities/HomeSection/BannerItem";
import HomeSection from "../../entities/HomeSection/HomeSection";
import IApi from "../iApi";

export default abstract class IHomeApi extends IApi {
  abstract getHomeSections(): Promise<HomeSection[]>;

  abstract getMainBanners(): Promise<BannerItem[]>;
}
