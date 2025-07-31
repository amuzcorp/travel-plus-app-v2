export default class TvSystemInfo {
  modelName: string;
  firmwareVersion: string;
  isUHD: boolean;
  sdkVersion: string;
  boardType: string;
  isWebOS6: boolean;
  tvMemory: string | null | undefined;

  constructor(
    modelName: string,
    firmwareVersion: string,
    isUHD: boolean,
    sdkVersion: string,
    boardType: string,
    isWebOS6: boolean,
    tvMemory?: string | null
  ) {
    this.modelName = modelName;
    this.firmwareVersion = firmwareVersion;
    this.isUHD = isUHD;
    this.sdkVersion = sdkVersion;
    this.boardType = boardType;
    this.isWebOS6 = isWebOS6;
    this.tvMemory = tvMemory;
  }

  static fromJson(json: Record<string, any>): TvSystemInfo {
    return new TvSystemInfo(
      json.modelName ?? "",
      json.firmwareVersion ?? "",
      json.isUHD ?? false,
      json.sdkVersion ?? "",
      json.boardType ?? "",
      json.isWebOS6 ?? false,
      json.tvMemory
    );
  }

  toJson(): Record<string, any> {
    return {
      modelName: this.modelName,
      firmwareVersion: this.firmwareVersion,
      isUHD: this.isUHD,
      sdkVersion: this.sdkVersion,
      boardType: this.boardType,
      isWebOS6: this.isWebOS6,
      tvMemory: this.tvMemory,
    };
  }

  static empty(): TvSystemInfo {
    return new TvSystemInfo("", "", false, "", "", false, null);
  }
}
