"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_OAUTH_SCOPE,
  GOOGLE_OAUTH_SCRIPT_SRC,
} from "@/constants/auth";
import { usePostAuthOauth } from "@/hooks/queries/auth/auth.bff.hook";

interface GoogleTokenClient {
  requestAccessToken: () => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token?: string }) => void;
          }) => GoogleTokenClient;
        };
      };
    };
  }
}

export const useGoogleLogin = () => {
  const router = useRouter();
  const tokenClientRef = useRef<GoogleTokenClient | null>(null);
  const scriptLoadPromiseRef = useRef<Promise<void> | null>(null);

  const { mutate, isPending, isSuccess } = usePostAuthOauth({
    mutation: { onSuccess: () => router.replace("/dashboard") },
  });

  const loadScript = useCallback(() => {
    if (scriptLoadPromiseRef.current) return scriptLoadPromiseRef.current;

    scriptLoadPromiseRef.current = new Promise<void>((resolve) => {
      if (document.querySelector(`script[src="${GOOGLE_OAUTH_SCRIPT_SRC}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = GOOGLE_OAUTH_SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });

    return scriptLoadPromiseRef.current;
  }, []);

  const ensureTokenClient = useCallback(async () => {
    await loadScript();

    if (!tokenClientRef.current && window.google && GOOGLE_CLIENT_ID) {
      tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: GOOGLE_OAUTH_SCOPE,
        callback: (response) => {
          if (!response.access_token) return;
          mutate({
            provider: "google",
            data: { token: response.access_token },
          });
        },
      });
    }

    return tokenClientRef.current;
  }, [loadScript, mutate]);

  const prepareGoogleLogin = useCallback(() => {
    void ensureTokenClient();
  }, [ensureTokenClient]);

  const loginWithGoogle = useCallback(async () => {
    const client = await ensureTokenClient();
    client?.requestAccessToken();
  }, [ensureTokenClient]);

  return { loginWithGoogle, prepareGoogleLogin, isPending, isSuccess };
};
