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

export const fetchTVSystemInfo = () => async (dispatch: AppDispatch) => {
  try {
    const res = await requestSystemInfo();
    const sdkVersion = res.sdkVersion || "0.0.0";
    const isWebOS6 = parseInt(sdkVersion.split(".")[0]) <= 6;

    dispatch(
      setTVSystemInfo({
        modelName: res.modelName || "",
        firmwareVersion: res.firmwareVersion || "",
        isUHD: res.UHD === "true",
        sdkVersion,
        boardType: res.boardType || "",
        isWebOS6,
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
        })
      );
    }
  }
};
