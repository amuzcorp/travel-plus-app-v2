import homeSectionJson from "../../assets/jsons/home_sections.json";
import HomeSection from "../../entities/HomeSection/HomeSection";
import IHomeApi from "./iHomeApi";

export default class FakeHomeApi extends IHomeApi {
  sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async getHomeSections(): Promise<HomeSection[]> {
    const data = homeSectionJson.data;

    const result: HomeSection[] = [];

    for (let i = 0; i < data.length; i++) {
      const sectionData = data[i];

      const section = HomeSection.fromJson("city", sectionData);

      result.push(section);
    }

    return result;
  }

  async getMainBanners(): Promise<[]> {
    return [];
  }
}
