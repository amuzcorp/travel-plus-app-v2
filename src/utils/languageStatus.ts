import LS2Request from "@enact/webos/LS2Request";

import { localStorageLanguageCode } from "../core/constants/globalConstant";
import env from "../env";

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

export const setLanguageCode = async () => {
  try {
    const res = await requestLS2(
      "luna://com.webos.settingsservice",
      "getSystemSettings",
      {
        keys: ["localeInfo"],
      }
    );

    const languageCode = res?.settings?.localeInfo?.locales?.UI;
    if (languageCode) {
      localStorage.setItem(localStorageLanguageCode.key, languageCode);
    } else {
      console.warn("언어 코드가 응답에 없습니다:", res);
    }
  } catch (err) {
    if (env?.IS_LOCAL) {
      localStorage.setItem(localStorageLanguageCode.key, "ko-KR");
    } else {
      console.error("언어 코드 조회 실패:", err);
    }
  }
};
