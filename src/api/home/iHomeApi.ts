import { Banner } from "../../entities/banner/Banner";
import HomeSection from "../../entities/HomeSection/HomeSection";
import IApi from "../iApi";

export default abstract class IHomeApi extends IApi {
  PREFIX = "/main";

  abstract getHomeSections(): Promise<HomeSection[]>;

  abstract getMainBanners(): Promise<Banner[]>;
}
