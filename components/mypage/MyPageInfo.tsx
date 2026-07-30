"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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
  useGetUsersCheckNickname,
  usePatchUserMe,
  usePatchUserPassword,
} from "@/hooks/queries/users/users.bff.hook";

export function MyPageInfo() {
  const { data: userMe } = useGetUserMe();
  const user = userMe?.data;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MyPageFormValues>({
    resolver: zodResolver(myPageFormSchema),
    defaultValues: {
      name: user?.name ?? "",
      image: user?.image ?? undefined,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const nameValue = useWatch({ control, name: "name" });
  const [checkedName, setCheckedName] = useState<string | null>(null);

  const isNameChanged = user !== undefined && nameValue !== user.name;
  const isChecked = checkedName !== null && checkedName === nameValue;
  const canCheck = isNameChanged && nameValue.length > 0 && !isChecked;

  const { data: nicknameCheck } = useGetUsersCheckNickname({
    name: checkedName ?? "",
  });
  const isNameAvailable = isChecked ? nicknameCheck?.data.available : undefined;

  const { mutateAsync: patchUserMe } = usePatchUserMe();
  const { mutateAsync: patchUserPassword } = usePatchUserPassword();

  const onSubmit = async (values: MyPageFormValues) => {
    if (!user) {
      return;
    }

    if (isNameChanged && isNameAvailable !== true) {
      showSaveFailureToast();
      return;
    }

    const currentPassword = values.currentPassword ?? "";

    const shouldUpdateProfile =
      values.name !== user.name || values.image !== (user.image ?? undefined);
    const shouldUpdatePassword = currentPassword !== "";

    if (!shouldUpdateProfile && !shouldUpdatePassword) {
      return;
    }

    const toastOptions = {
      onSuccess: showSaveSuccessToast,
      onError: showSaveFailureToast,
    };

    await Promise.allSettled([
      shouldUpdateProfile
        ? patchUserMe(
            { data: { name: values.name, image: values.image } },
            toastOptions,
          )
        : Promise.resolve(),
      shouldUpdatePassword
        ? patchUserPassword(
            {
              data: { currentPassword, newPassword: values.newPassword ?? "" },
            },
            toastOptions,
          )
        : Promise.resolve(),
    ]);
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
          <MyPageNameField
            control={control}
            isNameChanged={isNameChanged}
            canCheck={canCheck}
            isNameAvailable={isNameAvailable}
            onCheck={() => setCheckedName(nameValue)}
          />
        </div>

        <MyPagePasswordFields control={control} errors={errors} />
      </div>

      <Button type="submit" fullWidth>
        저장하기
      </Button>
    </form>
  );
}
