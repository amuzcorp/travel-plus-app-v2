import LS2Request from "@enact/webos/LS2Request";

import { appId } from "../core/constants/globalConstant";
import env from "../env";

const requestLS2 = (service: string, method: string, parameters: object): Promise<any> => {
  return new Promise((resolve, reject) => {
    new LS2Request().send({
      service,
      method,
      parameters,
      onSuccess: resolve,
      onFailure: reject,
    });
  });
};

export const checkNetworkStatus = async (): Promise<boolean> => {
  try {
    if (env?.IS_LOCAL) return true;
    const res = await requestLS2("luna://com.webos.service.connectionmanager", "getStatus", {});
    return res?.isInternetConnectionAvailable === true;
  } catch (err) {
    console.error("네트워크 상태 확인 실패:", err);
    return false;
  }
};

export const getTVSystemInfo = async (): Promise<{
  success: boolean;
  data?: {
    modelName: string;
    firmwareVersion: string;
    isUHD: boolean;
    sdkVersion: string;
    boardType: string;
  };
  message?: string;
  error?: any;
}> => {
  return new Promise((resolve) => {
    new LS2Request().send({
      service: "luna://com.webos.service.tv.systemproperty",
      method: "getSystemInfo",
      parameters: {
        keys: ["modelName", "firmwareVersion", "UHD", "sdkVersion", "boardType"],
      },
      onSuccess: (res: any) => {
        const sdkVersion = res.sdkVersion || "0.0.0";
        resolve({
          success: true,
          data: {
            modelName: res.modelName || "",
            firmwareVersion: res.firmwareVersion || "",
            isUHD: res.UHD === "true",
            sdkVersion,
            boardType: res.boardType || "",
          },
        });
      },
      onFailure: (err: any) => {
        if (env.IS_LOCAL) {
          resolve({
            success: true,
            data: {
              modelName: "webOSTV 24",
              firmwareVersion: "1.0.0",
              isUHD: true,
              sdkVersion: "8.2.0",
              boardType: "OLED55C4XLA.DTRQLJL",
            },
          });
        } else {
          resolve({
            success: false,
            message: "TV 시스템 정보를 가져오는데 실패했습니다.",
            error: err,
          });
        }
      },
    });
  });
};

// 네트워크 설정 실행
export const launchNetworkSettings = async (): Promise<void> => {
  try {
    const res = await getTVSystemInfo();
    const sdkMajor = parseInt(res?.data?.sdkVersion?.split(".")[0] || "0");

    if (sdkMajor > 6) {
      await requestLS2("luna://com.webos.applicationManager", "launch", {
        id: "com.webos.app.firstuse-overlay",
        params: {
          id: appId,
          target: "network",
        },
      });
    } else {
      await requestLS2("luna://com.webos.applicationManager", "launch", {
        id: "com.palm.app.settings",
        params: {
          target: "network",
        },
      });
    }
  } catch (err) {
    console.error("네트워크 설정 실행 실패:", err);
  }
};
