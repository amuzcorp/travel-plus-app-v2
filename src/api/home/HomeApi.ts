import BannerItem from "../../entities/HomeSection/BannerItem";
import HomeSection from "../../entities/HomeSection/HomeSection";
import IHomeApi from "./iHomeApi";

export default class HomeApi extends IHomeApi {
  PREFIX = "/main";

  private parseItemType(sectionType: string): string {
    const map: Record<string, string> = {
      city_ani: "city",
      ott_ani123: "ott",
      video: "content",
      ads: "ads",
      panorama123: "content",
      featured: "content",
      country_mini: "country",
    };
    return map[sectionType] ?? sectionType;
  }

  async getHomeSections(): Promise<HomeSection[]> {
    try {
      const res = await this.get(`${this.PREFIX}/sections`, false);

      const result: HomeSection[] = [];

      if (res.status === "success" && Array.isArray(res.data)) {
        for (const section of res.data) {
          const itemType = this.parseItemType(section.section_type);
          const homeSection = HomeSection.fromJson(itemType, section);
          result.push(homeSection);
        }
      }

      return result;
    } catch (error) {
      console.error("AMUZ 서버 getHomeSections 실패 :", error);
      return [];
    }
  }

  async getMainBanners(): Promise<BannerItem[]> {
    try {
      const res = await this.get(`${this.PREFIX}/banners`, false);

      const banners = (res.data || []).map((item: any) =>
        BannerItem.fromJson(item)
      );

      return banners;
    } catch (error) {
      console.error("AMUZ 서버 getMainBanners 실패 :", error);

      return [];
    }
  }
}
