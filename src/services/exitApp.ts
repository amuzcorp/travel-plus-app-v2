import LS2Request from "@enact/webos/LS2Request";

import { appId } from "../constants/globalConstant";

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

export const exitApp = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    await requestLS2(
      "luna://com.webos.service.applicationmanager",
      "closeByAppId",
      {
        id: appId,
      }
    );
    return {
      success: true,
      message: "앱이 성공적으로 종료되었습니다.",
    };
  } catch (err: any) {
    let errorMessage = "앱 종료에 실패했습니다.";

    if (err.errorCode === 2) {
      errorMessage = "앱이 실행 중이지 않거나 앱 ID를 찾을 수 없습니다.";
    } else if (err.errorText) {
      errorMessage = `앱 종료 실패(closeByAppId): ${err.errorText}`;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};
