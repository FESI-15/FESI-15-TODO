"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { twMerge } from "tailwind-merge";
import { FormInput } from "@/components/common/input/FormInput";
import { inputVariants } from "@/components/common/input/Input.variants";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Button } from "@/components/common/Button";
import { ProfileImageInput } from "./ProfileImageInput";
import { myPageFormSchema, type MyPageFormValues } from "./myPageForm.types";
import { showSaveFailureToast, showSaveSuccessToast } from "./toast";
import {
  useGetUserMe,
  useGetUsersCheckNickname,
  usePatchUserMe,
  usePatchUserPassword,
} from "@/hooks/queries/users/users.bff.hook";

const NICKNAME_CHECK_DEBOUNCE_MS = 400;

export function MyPageInfo() {
  const { data: userMe } = useGetUserMe();
  const user = userMe?.data;

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<MyPageFormValues>({
    resolver: zodResolver(myPageFormSchema),
    defaultValues: {
      name: "",
      image: undefined,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const userName = user?.name;
  const userImage = user?.image;
  const hasUser = user !== undefined;

  useEffect(() => {
    if (!hasUser) {
      return;
    }

    reset({
      name: userName,
      image: userImage ?? undefined,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [hasUser, userName, userImage, reset]);

  const nameValue = watch("name");
  const [debouncedName, setDebouncedName] = useState(nameValue);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedName(nameValue),
      NICKNAME_CHECK_DEBOUNCE_MS,
    );
    return () => clearTimeout(timer);
  }, [nameValue]);

  const isNameChanged = !!user && debouncedName !== user.name;
  const { data: nicknameCheck } = useGetUsersCheckNickname({
    name: isNameChanged ? debouncedName : "",
  });
  const isNameAvailable = nicknameCheck?.data.available;

  const passwordError =
    errors.currentPassword?.message ??
    errors.newPassword?.message ??
    errors.confirmPassword?.message;

  const { mutateAsync: patchUserMe } = usePatchUserMe();
  const { mutateAsync: patchUserPassword } = usePatchUserPassword();

  const onSubmit = async (values: MyPageFormValues) => {
    if (!user) {
      showSaveFailureToast();
      return;
    }

    const currentPassword = values.currentPassword ?? "";
    const newPassword = values.newPassword ?? "";

    const shouldUpdateProfile =
      values.name !== user.name || values.image !== (user.image ?? undefined);
    const shouldUpdatePassword = currentPassword !== "";

    if (!shouldUpdateProfile && !shouldUpdatePassword) {
      showSaveFailureToast();
      return;
    }

    const results = await Promise.allSettled([
      shouldUpdateProfile
        ? patchUserMe({ data: { name: values.name, image: values.image } })
        : Promise.resolve(),
      shouldUpdatePassword
        ? patchUserPassword({
            data: { currentPassword, newPassword },
          })
        : Promise.resolve(),
    ]);

    const hasFailure = results.some((result) => result.status === "rejected");

    if (hasFailure) {
      showSaveFailureToast();
      return;
    }

    showSaveSuccessToast();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[560px] flex-col items-center gap-12 rounded-[32px] bg-white px-8 py-8"
    >
      <ProfileImageInput control={control} name="image" />

      <div className="flex w-full flex-col gap-10">
        <div className="flex w-full flex-col gap-4">
          <Field className="gap-2">
            <FieldLabel className="text-sm md:text-base font-semibold text-gray-700">
              이메일
            </FieldLabel>
            <ShadcnInput
              readOnly
              value={user?.email ?? ""}
              className={twMerge(
                inputVariants({ variant: "text" }),
                "bg-[#FAFAFA]",
              )}
            />
          </Field>
          <div className="flex w-full flex-col gap-2">
            <FormInput control={control} name="name" label="이름" />
            {isNameChanged && (
              <p
                className={twMerge(
                  "min-h-5 px-1 text-sm font-medium",
                  isNameAvailable === undefined
                    ? ""
                    : isNameAvailable
                      ? "text-[#009D97]"
                      : "text-red-500",
                )}
              >
                {isNameAvailable === undefined
                  ? null
                  : isNameAvailable
                    ? "사용 가능한 이름입니다."
                    : "이미 사용 중인 이름입니다."}
              </p>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p className="px-1 text-base font-semibold text-gray-700">
            비밀번호 변경
          </p>
          <div className="flex w-full flex-col gap-3">
            <FormInput
              control={control}
              name="currentPassword"
              variant="password"
              placeholder="현재 비밀번호를 입력해주세요"
              hideError
            />
            <FormInput
              control={control}
              name="newPassword"
              variant="password"
              placeholder="새 비밀번호를 입력해주세요"
              hideError
            />
            <FormInput
              control={control}
              name="confirmPassword"
              variant="password"
              placeholder="새 비밀번호를 다시 입력해주세요"
              hideError
            />
            {passwordError && (
              <p className="px-1 text-sm font-medium text-red-500">
                {passwordError}
              </p>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" fullWidth>
        저장하기
      </Button>
    </form>
  );
}
