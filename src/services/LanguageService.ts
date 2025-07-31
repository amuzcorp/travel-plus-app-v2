import ILunaApi from "src/api/luna/iLunaApi";
import { localStorageLanguageCode } from "../constants/globalConstant";

export default class LanguageService {
  private static defaultLangCode = "en-US";

  static async setLanguageCode(lunaApi: ILunaApi): Promise<void> {
    try {
      const result = await lunaApi.getLanguageCode();

      const code = result?.settings?.localeInfo?.locales?.UI;

      if (!code) {
        throw new Error("code is null");
      }

      localStorage.setItem(localStorageLanguageCode.key, code);
    } catch (e) {
      localStorage.setItem(localStorageLanguageCode.key, this.defaultLangCode);
    }
  }

  static getLanguageCode(): string {
    return (
      localStorage.getItem(localStorageLanguageCode.key) ?? this.defaultLangCode
    );
  }
}
