export const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
export const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const TEAM_ID = process.env.TEAM_ID;
export const ACCESS_TOKEN_MAX_AGE = 60 * 60;
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 14;

export const AUTH_ONLY_PATHS = ["/", "/login", "/signup"];

export const PROTECTED_PATHS = [
  "/dashboard",
  "/goals",
  "/calendar",
  "/community",
  "/favorites",
  "/mypage",
  "/settings",
];
