import axios, { type AxiosRequestConfig } from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
) => {
  return apiClient<T>({
    ...config,
    ...options,
    headers: {
      ...config.headers,
      ...options?.headers,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN_SECRET}`,
    },
  });
};
