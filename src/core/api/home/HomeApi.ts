import HomeSection from "../../../entities/homeSection/homeSection";
import IHomeApi from "./iHomeApi";

export default class HomeApi extends IHomeApi {
  async getHomeSections(): Promise<HomeSection[]> {
    const response = await this.get("eijfaio;dsjf;lekjfaklsdf");

    return [];
  }

  async getMainBanners(): Promise<[]> {
    return [];
  }
}
