"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { m, useAnimation } from "motion/react";
import { Loader2Icon } from "lucide-react";

import { AuthLogo } from "@/components/auth/AuthLogo";
import { Button } from "@/components/common/Button";
import { SocialLoginSection } from "@/components/auth/SocialLoginSection";
import { LoginFormFields } from "@/components/auth/LoginFormFields";
import {
  loginSchema,
  type LoginFormValues,
} from "@/components/auth/authForm.types";
import { usePostAuthLogin } from "@/hooks/queries/auth/auth.bff.hook";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import { GOOGLE_OAUTH_SCRIPT_SRC } from "@/constants/auth";

export function LoginForm() {
  const router = useRouter();
  const [isGoogleScriptReady, setIsGoogleScriptReady] = useState(false);
  const shakeControls = useAnimation();
  const { control, handleSubmit, setError } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending, isSuccess } = usePostAuthLogin({
    mutation: {
      onSuccess: () => router.replace("/dashboard"),
      onError: () => {
        setError("password", {
          message: "이메일 또는 비밀번호가 올바르지 않습니다",
        });
        shakeControls.start({
          x: [0, -8, 8, -6, 6, -3, 3, 0],
          transition: { duration: 0.4, ease: "easeInOut" },
        });
      },
    },
  });

  const {
    loginWithGoogle,
    isPending: isGooglePending,
    isSuccess: isLoggedIn,
  } = useGoogleLogin(isGoogleScriptReady);

  const onSubmit = (data: LoginFormValues) => {
    mutate({ data });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-background px-5.5">
      <Script
        src={GOOGLE_OAUTH_SCRIPT_SRC}
        strategy="lazyOnload"
        onReady={() => setIsGoogleScriptReady(true)}
      />
      <m.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex w-full max-w-100 flex-col gap-8 md:gap-10"
      >
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-10">
            <AuthLogo />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 md:gap-8"
            >
              <m.div animate={shakeControls}>
                <LoginFormFields control={control} />
              </m.div>
              <Button
                type="submit"
                fullWidth
                disabled={
                  isPending || isSuccess || isGooglePending || isLoggedIn
                }
              >
                {isPending && (
                  <Loader2Icon className="mr-2 animate-spin" size={18} />
                )}
                로그인하기
              </Button>
            </form>
          </div>
          <p className="flex items-center justify-center gap-2 text-sm md:text-base">
            <span className="text-gray-700 dark:text-muted-foreground">
              슬리드투두가 처음이신가요?
            </span>
            <Link href="/signup" className="font-semibold text-orange-600">
              회원가입
            </Link>
          </p>
        </div>

        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
        >
          <SocialLoginSection
            label="SNS 계정으로 로그인"
            onClickGoogle={loginWithGoogle}
            isGooglePending={isGooglePending}
          />
        </m.div>
      </m.div>
    </div>
  );
}
