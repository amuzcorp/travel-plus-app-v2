import homeSectionJson from "../../assets/jsons/home_sections.json";
import HomeSection from "../../entities/HomeSection/HomeSection";
import IHomeApi from "./iHomeApi";

export default class FakeHomeApi extends IHomeApi {
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
    const data = homeSectionJson.data;

    const result: HomeSection[] = [];

    for (let i = 0; i < data.length; i++) {
      const sectionData = data[i];

      const itemType = this.parseItemType(sectionData.section_type);
      const section = HomeSection.fromJson(itemType, sectionData);
      result.push(section);
    }

    return result;
  }

  async getMainBanners(): Promise<[]> {
    return [];
  }
}
