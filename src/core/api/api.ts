import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { localStorageLanguageCode } from "../../core/constants/globalConstant";
import store from "../../core/store";
import { selectAccount } from "../../core/store/slices/accountSlice";
import { selectTVSystemInfo } from "../../core/store/slices/tvSystemSlice";
import env from "../../env";

// 환경변수에서 기본 URL 불러오기
const baseURL = env.API_URL;

/** 시스템 상태 **/
const getSystemInfo = () => {
  const tvInfo = selectTVSystemInfo(store.getState());
  return {
    languageCode:
      localStorage.getItem(localStorageLanguageCode.key) || navigator.language,
    devicePlatform: null,
    tvMemory: tvInfo?.tvMemory ?? null,
  };
};

/** 커스텀 Axios 설정 타입 */
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  requiresAuth?: boolean;
}

// Axios 인스턴스 생성
const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// locale이 필요없는 엔드포인트 목록
const excludeLocaleEndpoints = [
  "/tv/register",
  "/auth/login",
  "/auth/logout",
  // 필요한 경우 더 추가
];

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const customConfig = config as CustomAxiosRequestConfig;

    // 1. 인증 토큰 주입 (requiresAuth 플래그 기반)
    if (customConfig.requiresAuth) {
      const state = store.getState();
      const token = selectAccount(state).token;
      if (token) {
        if (!customConfig.headers) {
          throw new Error("headers is unexpectedly undefined");
        }

        (
          customConfig.headers as Record<string, string>
        ).Authorization = `Bearer ${token}`;
      }
    }

    // 2. 로케일/디바이스 정보 주입
    const { languageCode, devicePlatform, tvMemory } = getSystemInfo();

    // 현재 요청 URL이 제외 목록에 있는지 확인
    const shouldExcludeLocale = excludeLocaleEndpoints.some((endpoint) =>
      config?.url?.includes(endpoint)
    );

    if (!shouldExcludeLocale) {
      const currentLocale =
        languageCode.length > 4 ? languageCode.split("-")[0] : languageCode;

      customConfig.params = {
        ...customConfig.params,
        locale: currentLocale,
        devicePlatform: devicePlatform,
        tvMemory: tvMemory,
      };

      // POST/PUT body에도 같은 정보 삽입
      if (
        ["post", "put"].includes(customConfig.method?.toLowerCase() || "") &&
        customConfig.data &&
        typeof customConfig.data === "object"
      ) {
        customConfig.data = {
          ...customConfig.data,
          locale: currentLocale,
          devicePlatform: devicePlatform,
          tvMemory: tvMemory,
        };
      }
    }

    return customConfig;
  },
  (error) => Promise.reject(error)
);

export default api;
