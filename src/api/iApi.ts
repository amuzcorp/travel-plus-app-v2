import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import { localStorageLanguageCode } from "../constants/globalConstant";
import env from "../env";
import store from "../store";
import { selectAccount } from "../store/slices/accountSlice";
import { selectTVSystemInfo } from "../store/slices/tvSystemSlice";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  requiresAuth?: boolean;
}

export default abstract class IApi {
  constructor() {
    this.baseUrl = env.API_URL;

    this.api = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use(
      (
        config: InternalAxiosRequestConfig<any>
      ):
        | InternalAxiosRequestConfig<any>
        | Promise<InternalAxiosRequestConfig<any>> => {
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
        const { languageCode, devicePlatform, tvMemory } = this.getSystemInfo();

        // 현재 요청 URL이 제외 목록에 있는지 확인
        const shouldExcludeLocale = this.excludeLocaleEndpoints.some(
          (endpoint) => config?.url?.includes(endpoint)
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
            ["post", "put"].includes(
              customConfig.method?.toLowerCase() || ""
            ) &&
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
  }

  private baseUrl: string;

  private api: AxiosInstance;

  async get<T = any>(
    url: string,
    requiresAuth = false,
    params?: any
  ): Promise<T> {
    const config: CustomAxiosRequestConfig = {
      params,
      requiresAuth,
      headers: {} as AxiosRequestHeaders,
    };
    const response = await this.api.get<T>(url, config);
    return response.data;
  }

  async post<T = any>(
    url: string,
    data: any,
    requiresAuth = false
  ): Promise<T> {
    const config: CustomAxiosRequestConfig = {
      requiresAuth,
      headers: {} as AxiosRequestHeaders,
    };
    const response = await this.api.post<T>(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data: any, requiresAuth = false): Promise<T> {
    const config: CustomAxiosRequestConfig = {
      requiresAuth,
      headers: {} as AxiosRequestHeaders,
    };
    const response = await this.api.put<T>(url, data, config);
    return response.data;
  }

  async delete<T = any>(
    url: string,
    requiresAuth = false,
    params?: any
  ): Promise<T> {
    const config: CustomAxiosRequestConfig = {
      params,
      requiresAuth,
      headers: {} as AxiosRequestHeaders,
    };
    const response = await this.api.delete<T>(url, config);
    return response.data;
  }

  private getSystemInfo() {
    const tvInfo = selectTVSystemInfo(store.getState());

    return new SystemInfo({
      languageCode:
        localStorage.getItem(localStorageLanguageCode.key) ||
        navigator.language,
      tvMemory: tvInfo?.tvMemory ?? null,
    });
  }

  private excludeLocaleEndpoints = [
    "/tv/register",
    "/auth/login",
    "/auth/logout",
    // 필요한 경우 더 추가
  ];
}

class SystemInfo {
  constructor({
    languageCode,
    tvMemory = null,
  }: {
    languageCode: string;
    tvMemory: string | null;
  }) {
    this.languageCode = languageCode;
    this.tvMemory = tvMemory;
  }

  languageCode: string;
  devicePlatform = null;
  tvMemory: string | null;
}
