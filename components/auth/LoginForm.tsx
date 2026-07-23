"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

export function LoginForm() {
  const router = useRouter();
  const { control, handleSubmit, setError } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending } = usePostAuthLogin({
    mutation: {
      onSuccess: () => router.push("/dashboard"),
      onError: () =>
        setError("password", {
          message: "이메일 또는 비밀번호가 올바르지 않습니다",
        }),
    },
  });

  const { loginWithGoogle, isPending: isGooglePending } = useGoogleLogin();

  const onSubmit = (data: LoginFormValues) => {
    mutate({ data });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5.5">
      <div className="flex w-full max-w-100 flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-10">
            <AuthLogo />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 md:gap-8"
            >
              <LoginFormFields control={control} />
              <Button type="submit" fullWidth disabled={isPending}>
                로그인하기
              </Button>
            </form>
          </div>
          <p className="flex items-center justify-center gap-2 text-sm md:text-base">
            <span className="text-gray-700">슬리드투두가 처음이신가요?</span>
            <Link href="/signup" className="font-semibold text-orange-600">
              회원가입
            </Link>
          </p>
        </div>

        <SocialLoginSection
          label="SNS 계정으로 로그인"
          onClickGoogle={loginWithGoogle}
          isGooglePending={isGooglePending}
          className="flex flex-col items-center gap-4"
        />
      </div>
    </div>
  );
}
