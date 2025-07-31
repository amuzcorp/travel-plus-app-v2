import HomeSection from "../../../entities/homeSection/homeSection";
import IApi from "../iApi";

export default abstract class IHomeApi extends IApi {
  abstract getHomeSections(): Promise<HomeSection[]>;

  abstract getMainBanners(): Promise<[]>;
}
