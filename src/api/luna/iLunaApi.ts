import LS2Request from "@enact/webos/LS2Request";

export default abstract class ILunaApi {
  constructor() {
    this.ls2 = new LS2Request();
  }

  ls2: LS2Request;

  abstract getUserData(): Promise<Record<string, any>>;

  abstract launcAccountApp21(isLogin: boolean): Promise<Record<string, any>>;

  abstract launcAccountApp24(isLogin: boolean): Promise<Record<string, any>>;

  abstract speak(parameters: object): Promise<void>;

  abstract getLanguageCode(): Promise<Record<string, any>>;

  abstract checkNetworkStatus(): Promise<Record<string, any>>;

  abstract launchApp(parameters: object): Promise<void>;

  abstract killApp(): Promise<void>;

  abstract createToast(message: string): Promise<void>;

  abstract getSystemInfo(): Promise<Record<string, any>>;

  abstract getConfigs(): Promise<Record<string, any>>;
}
