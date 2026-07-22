"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/common/Button";
import { FormInput } from "@/components/common/input/FormInput";
import { SocialButton } from "@/components/common/SocialButton";
import { usePostAuthLogin } from "@/hooks/queries/auth/auth.bff.hook";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-100 flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4 px-2">
            <Image
              src="/icons/sidemenu/symbol.svg"
              alt="symbol"
              width={48}
              height={48}
            />
            <Image
              src="/icons/sidemenu/Slid to-do.svg"
              alt="Slid to-do"
              width={140}
              height={24}
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 md:gap-8"
          >
            <div className="flex flex-col gap-3 md:gap-4">
              <FormInput
                control={control}
                name="email"
                placeholder="이메일을 입력해주세요"
              />
              <FormInput
                control={control}
                name="password"
                variant="password"
                placeholder="비밀번호를 입력해주세요"
              />
            </div>

            <div className="flex flex-col gap-4 md:gap-6">
              <Button type="submit" fullWidth disabled={isPending}>
                로그인하기
              </Button>
              <p className="flex items-center justify-center gap-2 text-sm md:text-base">
                <span className="text-gray-700">
                  슬리드투두가 처음이신가요?
                </span>
                <Link href="/signup" className="font-semibold text-orange-600">
                  회원가입
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex w-full items-center gap-2">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="whitespace-nowrap text-xs text-gray-400 md:text-sm">
              SNS 계정으로 로그인
            </span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="flex items-center justify-center gap-4">
            <SocialButton
              provider="google"
              onClick={loginWithGoogle}
              disabled={isGooglePending}
            />
            <SocialButton provider="kakao" />
          </div>
        </div>
      </div>
    </div>
  );
}
