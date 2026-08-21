"use client";

import { useRouter } from "next/navigation";
import { usePostAuthLogout } from "@/hooks/queries/auth/auth.bff.hook";
import SettingsIcon from "@/public/icons/sidemenu/settings.svg";
import LogoutIcon from "@/public/icons/sidemenu/logout.svg";
import dynamic from "next/dynamic";
import { useState } from "react";

const SettingModal = dynamic(
  () => import("@/components/common/Modal/SettingModal/SettingModal"),
  { ssr: false },
);

export default function SideMenuUtilMenu() {
  const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);
  const router = useRouter();
  const { mutate: logout } = usePostAuthLogout({
    mutation: {
      onSuccess: () => {
        router.replace("/login");
        router.refresh();
      },
    },
  });

  return (
    <ul className="mt-6">
      <li>
        <button
          type="button"
          className="flex items-center gap-2.5 text-gray-500 dark:text-muted-foreground px-4 py-3.5 w-full"
          onClick={() => setIsOpenSettingModal(true)}
        >
          <SettingsIcon className="size-6 text-gray-300 dark:text-muted-foreground" />
          <span className="font-semibold text-lg">설정</span>
        </button>
        {isOpenSettingModal && (
          <SettingModal
            open={isOpenSettingModal}
            onClose={() => setIsOpenSettingModal(false)}
          />
        )}
      </li>
      <li>
        <button
          type="button"
          onClick={() => logout()}
          className="flex items-center gap-2.5 text-gray-500 dark:text-muted-foreground px-4 py-3.5 w-full"
        >
          <LogoutIcon className="size-6 text-gray-300 dark:text-muted-foreground" />
          <span className="font-semibold text-lg">로그아웃</span>
        </button>
      </li>
    </ul>
  );
}
