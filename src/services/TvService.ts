import ILunaApi from "../api/luna/iLunaApi";
import env from "../env";
import { TVSystemInfo } from "../store/slices/tvSystemSlice";

export default class TvService {
  static async requestSystemInfo(
    lunaApi: ILunaApi
  ): Promise<Record<string, any>> {
    return lunaApi.getSystemInfo();
  }

  static async requestMemory(lunaApi: ILunaApi): Promise<string | null> {
    const result = await lunaApi.getConfigs();

    return result?.configs["tv.hw.ddrSize"] ?? null;
  }

  static async getSystemInfo(lunaApi: ILunaApi): Promise<TVSystemInfo> {
    try {
      const [systemInfo, memory] = await Promise.all([
        this.requestSystemInfo(lunaApi),
        this.requestMemory(lunaApi),
      ]);

      const sdkVersion = systemInfo.sdkVersion || "0.0.0";
      const isWebOS6 = parseInt(sdkVersion.split(".")[0]) <= 6;

      return {
        modelName: systemInfo.modelName || "",
        firmwareVersion: systemInfo.firmwareVersion || "",
        isUHD: systemInfo.UHD === "true",
        sdkVersion: sdkVersion,
        boardType: systemInfo.boardType || "",
        isWebOS6: isWebOS6,
        tvMemory: memory || undefined,
      };
    } catch (e) {
      console.log("Error from getSystemInfo : " + e);

      if (env.IS_LOCAL) {
        return {
          modelName: "webOSTV 24",
          firmwareVersion: "1.0.0",
          isUHD: true,
          sdkVersion: "8.2.0",
          boardType: "OLED55C4XLA.DTRQLJL",
          isWebOS6: false,
          tvMemory: null,
        };
      }

      return {
        modelName: "",
        firmwareVersion: "0.0.0",
        isUHD: false,
        sdkVersion: "0.0.0",
        boardType: "",
        isWebOS6: false,
        tvMemory: null,
      };
    }
  }
}
