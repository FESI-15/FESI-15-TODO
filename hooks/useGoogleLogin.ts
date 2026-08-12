"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { GOOGLE_CLIENT_ID, GOOGLE_OAUTH_SCOPE } from "@/constants/auth";
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

export const useGoogleLogin = (isScriptReady: boolean) => {
  const router = useRouter();
  const tokenClientRef = useRef<GoogleTokenClient | null>(null);

  const { mutate, isPending, isSuccess } = usePostAuthOauth({
    mutation: { onSuccess: () => router.replace("/dashboard") },
  });

  useEffect(() => {
    if (!isScriptReady || !window.google || !GOOGLE_CLIENT_ID) return;

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
  }, [isScriptReady, mutate]);

  const loginWithGoogle = () => {
    tokenClientRef.current?.requestAccessToken();
  };

  return { loginWithGoogle, isPending, isSuccess };
};
