import { AxiosRequestConfig } from "axios";
import api from "./api";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  requiresAuth?: boolean;
}

export const apiService = {
  async get<T = any>(
    url: string,
    requiresAuth = false,
    params?: any
  ): Promise<T> {
    const config: CustomAxiosRequestConfig = {
      params,
      requiresAuth,
    };
    const response = await api.get<T>(url, config);
    return response.data;
  },

  async post<T = any>(
    url: string,
    data: any,
    requiresAuth = false
  ): Promise<T> {
    const config: CustomAxiosRequestConfig = { requiresAuth };
    const response = await api.post<T>(url, data, config);
    return response.data;
  },

  async put<T = any>(url: string, data: any, requiresAuth = false): Promise<T> {
    const config: CustomAxiosRequestConfig = { requiresAuth };
    const response = await api.put<T>(url, data, config);
    return response.data;
  },

  async delete<T = any>(
    url: string,
    requiresAuth = false,
    params?: any
  ): Promise<T> {
    const config: CustomAxiosRequestConfig = {
      params,
      requiresAuth,
    };
    const response = await api.delete<T>(url, config);
    return response.data;
  },
};
