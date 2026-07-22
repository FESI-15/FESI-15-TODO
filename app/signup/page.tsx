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
import { usePostAuthSignup } from "@/hooks/queries/auth/auth.bff.hook";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";

const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "이름을 입력해주세요")
      .max(20, "이름은 20자 이하로 입력해주세요"),
    email: z
      .string()
      .min(1, "이메일을 입력해주세요")
      .email("올바른 이메일 형식이 아닙니다"),
    password: z.string().min(8, "비밀번호는 8자 이상 입력해주세요"),
    passwordConfirm: z.string().min(1, "비밀번호를 한 번 더 입력해주세요"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-100 flex-col gap-8"
      >
        <div className="flex flex-col items-center gap-8 md:gap-12">
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

          <div className="flex w-full flex-col gap-3 md:gap-4">
            <FormInput
              control={control}
              name="name"
              label="이름"
              placeholder="이름을 입력해주세요"
            />
            <FormInput
              control={control}
              name="email"
              label="이메일"
              placeholder="이메일을 입력해주세요"
            />
            <FormInput
              control={control}
              name="password"
              variant="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
            />
            <FormInput
              control={control}
              name="passwordConfirm"
              variant="password"
              label="비밀번호 확인"
              placeholder="비밀번호를 한 번 더 입력해주세요"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col items-center gap-4 md:gap-6">
            <Button type="submit" fullWidth disabled={isPending}>
              회원가입 하기
            </Button>
            <p className="flex items-center justify-center gap-2 text-sm md:text-base">
              <span className="text-gray-700">이미 회원이신가요?</span>
              <Link href="/login" className="font-semibold text-orange-600">
                로그인
              </Link>
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 md:gap-4">
            <div className="flex w-full items-center gap-2">
              <span className="h-px flex-1 bg-gray-200" />
              <span className="whitespace-nowrap text-xs text-gray-400 md:text-sm">
                SNS 계정으로 회원가입
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
      </form>
    </div>
  );
}
