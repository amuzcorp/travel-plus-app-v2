import HomeSection from "../../entities/homeSection/HomeSection";
import { Banner } from "../../entities/banner/Banner";
import IHomeApi from "./iHomeApi";

export default class HomeApi extends IHomeApi {
  async getHomeSections(): Promise<HomeSection[]> {
    // const response = await this.get("eijfaio;dsjf;lekjfaklsdf");

    return [];
  }

  async getMainBanners(): Promise<Banner[]> {
    try {
      const res = await this.get(`${this.PREFIX}/banners`, false);

      const banners = (res.data || []).map((item: any) =>
        Banner.fromJson(item)
      );

      return banners;
    } catch (error) {
      console.error("AMUZ 서버 getMainBanners 실패 :", error);
      return [];
    }
  }
}
