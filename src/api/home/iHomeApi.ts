import HomeSection from "../../entities/homeSection/homeSection";
import { Banner } from "../../entities/banner/Banner";
import IApi from "../iApi";

export default abstract class IHomeApi extends IApi {
  PREFIX = "/main";
  abstract getHomeSections(): Promise<HomeSection[]>;

  abstract getMainBanners(): Promise<Banner[]>;
}
