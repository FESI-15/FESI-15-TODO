import axios, { type AxiosRequestConfig } from "axios";

export const bffClient = axios.create({
  baseURL: "",
  withCredentials: true,
});

export const bffInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
) => {
  return bffClient<T>({
    ...config,
    ...options,
    headers: {
      ...config.headers,
      ...options?.headers,
    },
  });
};
