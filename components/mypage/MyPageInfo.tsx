"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { m } from "motion/react";
import { Button } from "@/components/common/Button";
import { ProfileImageInput } from "./ProfileImageInput";
import { MyPageEmailField } from "./MyPageEmailField";
import { MyPageNameField } from "./MyPageNameField";
import { MyPagePasswordFields } from "./MyPagePasswordFields";
import { myPageFormSchema, type MyPageFormValues } from "./myPageForm.types";
import {
  useGetUserMe,
  useGetUsersCheckNickname,
  usePatchUserMe,
  usePatchUserPassword,
} from "@/hooks/queries/users/users.bff.hook";
import useHeaderStore from "@/store/useHeaderStore";
import { showSaveFailureToast, showSaveSuccessToast } from "@/utils/toast";

export function MyPageInfo() {
  const { data: userMe } = useGetUserMe();
  const user = userMe?.data;
  const setTitle = useHeaderStore((s) => s.setTitle);

  useEffect(() => {
    setTitle("내 정보 관리");
  }, [setTitle]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MyPageFormValues>({
    resolver: zodResolver(myPageFormSchema),
    defaultValues: {
      name: user?.name ?? "",
      image: user?.image ?? null,
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
      showSaveFailureToast("이름 중복 확인을 해주세요.");
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
      onSuccess: () => showSaveSuccessToast("저장이 완료되었습니다."),
      onError: () => showSaveFailureToast("저장이 실패하였습니다."),
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
    <>
      <m.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="px-1 mb-10 text-2xl font-semibold text-black dark:text-foreground hidden lg:block"
      >
        내 정보 관리
      </m.h1>
      <m.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex w-full flex-col items-center gap-12 rounded-[32px] bg-white dark:bg-card p-5 md:py-10 md:px-8"
      >
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <ProfileImageInput control={control} name="image" />
        </m.div>

        <div className="flex w-full flex-col gap-10">
          <div className="flex w-full flex-col gap-4">
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            >
              <MyPageEmailField email={user?.email} />
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
            >
              <MyPageNameField
                control={control}
                isNameChanged={isNameChanged}
                canCheck={canCheck}
                isNameAvailable={isNameAvailable}
                onCheck={() => setCheckedName(nameValue)}
              />
            </m.div>
          </div>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
          >
            <MyPagePasswordFields control={control} errors={errors} />
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 1.4 }}
          className="w-full"
        >
          <Button type="submit" fullWidth>
            저장하기
          </Button>
        </m.div>
      </m.form>
    </>
  );
}
