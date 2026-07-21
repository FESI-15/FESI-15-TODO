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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI1MzksInRlYW1JZCI6IjIiLCJleHAiOjE3ODQ1NDI3Nzh9.yH8ESSdV6WqPbbwl5UsMigffeFIlGEZldy2Y6gxV_E0`,
    },
  });
};
