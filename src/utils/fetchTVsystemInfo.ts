import LS2Request from "@enact/webos/LS2Request";

import { AppDispatch } from "../core/store";
import { setTVSystemInfo } from "../core/store/slices/tvSystemSlice";
import env from "../env";

const requestSystemInfo = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    new LS2Request().send({
      service: "luna://com.webos.service.tv.systemproperty",
      method: "getSystemInfo",
      parameters: {
        keys: [
          "modelName",
          "firmwareVersion",
          "UHD",
          "sdkVersion",
          "boardType",
        ],
      },
      onSuccess: resolve,
      onFailure: reject,
    });
  });
};

const requestTVMemory = (): Promise<string | null> => {
  return new Promise((resolve) => {
    new LS2Request().send({
      service: "luna://com.webos.service.config",
      method: "getConfigs",
      parameters: {
        configNames: ["tv.hw.ddrSize"],
      },
      onSuccess: (res: any) => {
        if (res && res.returnValue === true) {
          resolve(res.configs["tv.hw.ddrSize"] || null);
        } else {
          console.warn("getConfigsDirect 실패 응답:", res);
          resolve(null);
        }
      },
      onFailure: (err: any) => {
        console.warn("getConfigsDirect 실패:", err);
        resolve(null);
      },
    });
  });
};

export const fetchTVSystemInfo = () => async (dispatch: AppDispatch) => {
  try {
    const [sysInfo, tvMemory] = await Promise.all([
      requestSystemInfo(),
      requestTVMemory(),
    ]);

    const sdkVersion = sysInfo.sdkVersion || "0.0.0";
    const isWebOS6 = parseInt(sdkVersion.split(".")[0]) <= 6;

    dispatch(
      setTVSystemInfo({
        modelName: sysInfo.modelName || "",
        firmwareVersion: sysInfo.firmwareVersion || "",
        isUHD: sysInfo.UHD === "true",
        sdkVersion: sdkVersion,
        boardType: sysInfo.boardType || "",
        isWebOS6: isWebOS6,
        tvMemory: tvMemory || undefined,
      })
    );
  } catch (err) {
    console.warn("TV 시스템 정보 조회 실패:", err);
    if (env.IS_LOCAL) {
      dispatch(
        setTVSystemInfo({
          modelName: "webOSTV 24",
          firmwareVersion: "1.0.0",
          isUHD: true,
          sdkVersion: "8.2.0",
          boardType: "OLED55C4XLA.DTRQLJL",
          isWebOS6: false,
          tvMemory: null,
        })
      );
    }
  }
};
