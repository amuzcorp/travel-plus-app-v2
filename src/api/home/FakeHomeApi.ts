import HomeSection from "../../entities/homeSection/HomeSection";
import IHomeApi from "./iHomeApi";

export default class FakeHomeApi extends IHomeApi {
  sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async getHomeSections(): Promise<HomeSection[]> {
    await this.sleep(1000);

    // const data = homeSectionJson.data;

    return [];
  }

  async getMainBanners(): Promise<[]> {
    return [];
  }
}
