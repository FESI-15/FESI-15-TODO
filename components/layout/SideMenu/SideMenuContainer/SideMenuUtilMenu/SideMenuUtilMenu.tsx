"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePostAuthLogout } from "@/hooks/queries/auth/auth.bff.hook";
import SettingModal from "@/components/common/Modal/SettingModal/SettingModal";

export default function SideMenuUtilMenu() {
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
        <SettingModal
          trigger={
            <button
              type="button"
              className="flex items-center gap-2.5 text-gray-500 px-4 py-3.5 w-full"
            >
              <Image
                src="/icons/sidemenu/settings.svg"
                alt="settings"
                width={24}
                height={24}
              />
              <span className="font-semibold text-lg">설정</span>
            </button>
          }
        />
      </li>
      <li>
        <button
          type="button"
          onClick={() => logout()}
          className="flex items-center gap-2.5 text-gray-500 px-4 py-3.5 w-full"
        >
          <Image
            src="/icons/sidemenu/logout.svg"
            alt="logout"
            width={24}
            height={24}
          />
          <span className="font-semibold text-lg">로그아웃</span>
        </button>
      </li>
    </ul>
  );
}
