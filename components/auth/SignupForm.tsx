"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthLogo } from "@/components/auth/AuthLogo";
import { Button } from "@/components/common/Button";
import { SocialLoginSection } from "@/components/auth/SocialLoginSection";
import { SignupFormFields } from "@/components/auth/SignupFormFields";
import {
  signupSchema,
  type SignupFormValues,
} from "@/components/auth/authForm.types";
import { usePostAuthSignup } from "@/hooks/queries/auth/auth.bff.hook";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";

export function SignupForm() {
  const router = useRouter();
  const { control, handleSubmit, setError } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", passwordConfirm: "" },
  });

  const { mutate, isPending } = usePostAuthSignup({
    mutation: {
      onSuccess: () => router.push("/dashboard"),
      onError: () =>
        setError("email", {
          message: "이미 가입된 이메일이거나 요청이 올바르지 않습니다",
        }),
    },
  });

  const { loginWithGoogle, isPending: isGooglePending } = useGoogleLogin();

  const onSubmit = (data: SignupFormValues) => {
    mutate({
      data: { name: data.name, email: data.email, password: data.password },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5.5">
      <div className="flex w-full max-w-100 flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col items-center gap-8 md:gap-12">
            <AuthLogo />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-8"
            >
              <SignupFormFields control={control} />
              <Button type="submit" fullWidth disabled={isPending}>
                회원가입 하기
              </Button>
            </form>
          </div>
          <p className="flex items-center justify-center gap-2 text-sm md:text-base">
            <span className="text-gray-700">이미 회원이신가요?</span>
            <Link href="/login" className="font-semibold text-orange-600">
              로그인
            </Link>
          </p>
        </div>

        <SocialLoginSection
          label="SNS 계정으로 회원가입"
          onClickGoogle={loginWithGoogle}
          isGooglePending={isGooglePending}
        />
      </div>
    </div>
  );
}
