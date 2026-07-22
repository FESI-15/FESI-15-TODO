"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isScriptLoaded, setIsScriptLoaded] = useState(
    () =>
      typeof document !== "undefined" &&
      Boolean(
        document.querySelector(`script[src="${GOOGLE_OAUTH_SCRIPT_SRC}"]`),
      ),
  );

  const { mutate, isPending } = usePostAuthOauth({
    mutation: { onSuccess: () => router.push("/dashboard") },
  });

  useEffect(() => {
    if (isScriptLoaded) return;

    const script = document.createElement("script");
    script.src = GOOGLE_OAUTH_SCRIPT_SRC;
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.head.appendChild(script);
  }, [isScriptLoaded]);

  useEffect(() => {
    if (!isScriptLoaded || !window.google || !GOOGLE_CLIENT_ID) return;

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
  }, [isScriptLoaded, mutate]);

  const loginWithGoogle = () => {
    tokenClientRef.current?.requestAccessToken();
  };

  return { loginWithGoogle, isPending };
};
