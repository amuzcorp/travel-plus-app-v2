import LS2Request from "@enact/webos/LS2Request";

import { appId } from "../constants/globalConstant";
import env from "../env";
import store from "../store";
import { selectIsWebOS6 } from "../store/slices/tvSystemSlice";

const requestLS2 = (
  service: string,
  method: string,
  parameters: object
): Promise<any> => {
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

// 네트워크 상태 확인
export const checkNetworkStatus = async (): Promise<boolean> => {
  try {
    if (env.IS_LOCAL) return true;
    const res = await requestLS2(
      "luna://com.webos.service.connectionmanager",
      "getStatus",
      {}
    );
    return res?.isInternetConnectionAvailable === true;
  } catch (err) {
    console.error("네트워크 상태 확인 실패:", err);
    return false;
  }
};

// 네트워크 설정 실행
export const launchNetworkSettings = async (): Promise<void> => {
  try {
    const isWebOS6 = selectIsWebOS6(store.getState());

    const targetApp = isWebOS6
      ? "com.palm.app.settings"
      : "com.webos.app.firstuse-overlay";

    const params = isWebOS6
      ? { target: "network" }
      : { id: appId, target: "network" };

    await requestLS2("luna://com.webos.applicationManager", "launch", {
      id: targetApp,
      params,
    });
  } catch (err) {
    console.error("네트워크 설정 실행 실패:", err);
  }
};
