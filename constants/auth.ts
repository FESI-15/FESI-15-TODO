export const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
export const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const ACCESS_TOKEN_MAX_AGE = 60 * 60;
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 14;

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
export const GOOGLE_OAUTH_SCRIPT_SRC = "https://accounts.google.com/gsi/client";
export const GOOGLE_OAUTH_SCOPE = "openid email profile";

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
