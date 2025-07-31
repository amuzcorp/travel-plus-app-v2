import LS2Request from "@enact/webos/LS2Request";

export default abstract class ILunaApi {
  constructor() {
    this.ls2 = new LS2Request();
  }

  ls2: LS2Request;

  abstract getUserData(): Promise<Record<string, any>>;

  abstract launcAccountApp21(isLogin: boolean): Promise<Record<string, any>>;

  abstract launcAccountApp24(isLogin: boolean): Promise<Record<string, any>>;
}
