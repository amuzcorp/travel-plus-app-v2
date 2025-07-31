import { appId } from "../../constants/globalConstant";
import ILunaApi from "./iLunaApi";

export default class FakeLunaApi extends ILunaApi {
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

      return {};
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
}
