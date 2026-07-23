import axios, { type AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

import type {
  PostTeamIdAuthRefresh200,
  PostTeamIdAuthRefreshBody,
} from "@/apis/model";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_MAX_AGE,
} from "@/constants/auth";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

let refreshPromise: Promise<PostTeamIdAuthRefresh200> | null = null;

const refreshAccessToken = (refreshToken: string) => {
  if (!refreshPromise) {
    refreshPromise = apiClient
      .post<PostTeamIdAuthRefresh200>("/auth/refresh", {
        refreshToken,
      } satisfies PostTeamIdAuthRefreshBody)
      .then(({ data }) => data)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      !axios.isAxiosError(error) ||
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

    if (!refreshToken) {
      return Promise.reject(error);
    }

    try {
      const data = await refreshAccessToken(refreshToken);
      const secure = process.env.NODE_ENV === "production";

      cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, data.accessToken, {
        httpOnly: true,
        secure,
        sameSite: "lax",
        path: "/",
        maxAge: ACCESS_TOKEN_MAX_AGE,
      });

      if (data.refreshToken) {
        cookieStore.set(REFRESH_TOKEN_COOKIE_NAME, data.refreshToken, {
          httpOnly: true,
          secure,
          sameSite: "lax",
          path: "/",
          maxAge: REFRESH_TOKEN_MAX_AGE,
        });
      }

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${data.accessToken}`,
      };
      return apiClient(originalRequest);
    } catch (refreshError) {
      cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
      cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
      return Promise.reject(refreshError);
    }
  },
);

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
    },
  });
};
