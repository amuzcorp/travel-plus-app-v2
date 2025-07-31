import { appId } from "../../constants/globalConstant";
import ILunaApi from "./iLunaApi";

export default class LunaApi extends ILunaApi {
  async getUserData(): Promise<Record<string, any>> {
    try {
      const res: Record<string, any> = await new Promise((resolve, reject) => {
        this.ls2.send({
          service: "luna://com.webos.service.accountmanager",
          method: "getLoginUserData",
          parameters: { serviceName: "LGE" },
          onSuccess: resolve,
          onFailure: reject,
        });
      });

      return res;
    } catch (e) {
      console.log("Error from getUserData : " + e);

      throw Error(`${e}`);
    }
  }

  async launcAccountApp21(isLogin: boolean): Promise<Record<string, any>> {
    return new Promise((resolve) => {
      this.ls2.send({
        service: "luna://com.webos.applicationManager",
        method: "launch",
        parameters: {
          id: "com.webos.app.membership",
          params: {
            id: appId,
            query: isLogin ? "login" : "occupyCertify",
          },
        },
        onSuccess: (res: any) => resolve({ success: true, data: res }),
        onFailure: (err: any) =>
          resolve({ success: false, message: "계정 앱 실행 실패", error: err }),
      });
    });
  }

  async launcAccountApp24(isLogin: boolean): Promise<Record<string, any>> {
    return new Promise((resolve) => {
      this.ls2.send({
        service: "luna://com.webos.applicationManager",
        method: "launchDefaultApp",
        parameters: {
          category: "MembershipApp",
          params: {
            id: appId,
            query: isLogin ? "login" : "occupyCertify",
            position: "left",
          },
        },
        onSuccess: (res: any) => resolve({ success: true, data: res }),
        onFailure: (err: any) =>
          resolve({ success: false, message: "계정 앱 실행 실패", error: err }),
      });
    });
  }

  async speak(parameters: object): Promise<void> {
    const service = "luna://com.webos.service.tts";
    const method = "speak";

    return new Promise((resolve, reject) => {
      this.ls2.send({
        service,
        method,
        parameters,
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  }

  async getLanguageCode(): Promise<Record<string, any>> {
    const service = "luna://com.webos.settingsservice";
    const method = "getSystemSettings";
    const parameters = {
      keys: ["localeInfo"],
    };

    return new Promise((resolve, reject) => {
      this.ls2.send({
        service,
        method,
        parameters,
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  }

  async checkNetworkStatus(): Promise<Record<string, any>> {
    const service = "luna://com.webos.service.connectionmanager";
    const method = "getStatus";
    const parameters = {};

    return new Promise((resolve, reject) => {
      this.ls2.send({
        service,
        method,
        parameters,
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  }

  async launchApp(parameters: object): Promise<void> {
    const service = "luna://com.webos.applicationManager";
    const method = "launch";

    return new Promise((resolve, reject) => {
      this.ls2.send({
        service,
        method,
        parameters,
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  }

  async killApp(): Promise<void> {
    const service = "luna://com.webos.service.applicationmanager";
    const method = "closeByAppId";
    const parameters = {
      id: appId,
    };

    return new Promise((resolve, reject) => {
      this.ls2.send({
        service,
        method,
        parameters,
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  }

  async createToast(message: string): Promise<void> {
    const service = "luna://com.webos.notification";
    const method = "createToast";
    const parameters = {
      message,
    };

    return new Promise((resolve, reject) => {
      this.ls2.send({
        service,
        method,
        parameters,
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  }

  async getSystemInfo(): Promise<Record<string, any>> {
    const service = "luna://com.webos.service.tv.systemproperty";
    const method = "getSystemInfo";
    const parameters = {
      keys: ["modelName", "firmwareVersion", "UHD", "sdkVersion", "boardType"],
    };

    return new Promise((resolve, reject) => {
      this.ls2.send({
        service,
        method,
        parameters,
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  }

  async getConfigs(): Promise<Record<string, any>> {
    const service = "luna://com.webos.service.config";
    const method = "getConfigs";
    const parameters = {
      configNames: ["tv.hw.ddrSize"],
    };

    return new Promise((resolve, reject) => {
      this.ls2.send({
        service,
        method,
        parameters,
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  }
}
