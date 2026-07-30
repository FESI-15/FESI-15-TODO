"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/common/Button";
import { ProfileImageInput } from "./ProfileImageInput";
import { MyPageEmailField } from "./MyPageEmailField";
import { MyPageNameField } from "./MyPageNameField";
import { MyPagePasswordFields } from "./MyPagePasswordFields";
import { myPageFormSchema, type MyPageFormValues } from "./myPageForm.types";
import { showSaveFailureToast, showSaveSuccessToast } from "./toast";
import {
  useGetUserMe,
  usePatchUserMe,
  usePatchUserPassword,
} from "@/hooks/queries/users/users.bff.hook";

export function MyPageInfo() {
  const { data: userMe } = useGetUserMe();
  const user = userMe?.data;

  const {
    control,
    handleSubmit,
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
          <MyPageEmailField email={user?.email} />
          <MyPageNameField control={control} savedName={user?.name} />
        </div>

        <MyPagePasswordFields control={control} errors={errors} />
      </div>

      <Button type="submit" fullWidth>
        저장하기
      </Button>
    </form>
  );
}
