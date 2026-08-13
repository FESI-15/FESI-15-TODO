import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { cookies } from "next/headers";

import type {
  PostTeamIdAuthRefresh200,
  PostTeamIdAuthRefreshBody,
} from "@/apis/model";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_MAX_AGE,
  NO_AUTH_API_PATHS,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_MAX_AGE,
} from "@/constants/auth";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const isNoAuthPath = NO_AUTH_API_PATHS.some((path) =>
    config.url?.startsWith(path),
  );

  if (isNoAuthPath || config.headers?.Authorization) {
    return config;
  }

  return Promise.reject(
    new AxiosError(
      "Authentication is required.",
      "ERR_UNAUTHORIZED",
      config,
      undefined,
      {
        status: 401,
        data: { message: "Authentication is required." },
      } as AxiosResponse,
    ),
  );
});

const refreshPromiseMap = new Map<string, Promise<PostTeamIdAuthRefresh200>>();

const refreshAccessToken = (refreshToken: string) => {
  const existingPromise = refreshPromiseMap.get(refreshToken);
  if (existingPromise) {
    return existingPromise;
  }

  const promise = apiClient
    .post<PostTeamIdAuthRefresh200>("/auth/refresh", {
      refreshToken,
    } satisfies PostTeamIdAuthRefreshBody)
    .then(({ data }) => data)
    .finally(() => {
      refreshPromiseMap.delete(refreshToken);
    });

  refreshPromiseMap.set(refreshToken, promise);
  return promise;
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
      originalRequest._retry ||
      originalRequest.url === "/auth/refresh"
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

      try {
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
      } catch {}

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${data.accessToken}`,
      };
      return apiClient(originalRequest);
    } catch (refreshError) {
      try {
        cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
        cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
      } catch {}
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
