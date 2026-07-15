"use client";

import SideMenuList from "./SideMenuList/SideMenuList";
import Image from "next/image";
import SideMenuUtilMenu from "./SideMenuUtilMenu/SideMenuUtilMenu";
import SideMenuActions from "./SideMenuActions/SideMenuActions";
import SideMenuProfile from "./SideMenuProfile/SideMenuProfile";
import * as m from "motion/react-m";
import { SideMenuBell } from "./SideMenuBell/SideMenuBell";
import { Notification } from "@/components/common/notification/Notification";
import { NotificationItemType } from "@/types/notification";

interface SideMenuContainerProps {
  notifications: NotificationItemType[];
  newNotification: boolean;
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

export default function SideMenuContainer({
  notifications,
  newNotification,
  onMarkAsRead,
  onMarkAllAsRead,
}: SideMenuContainerProps) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.3,
          delay: 0.2,
        },
      }}
    >
      <div className="flex items-center gap-4 pl-2 mb-10">
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

      <SideMenuList
        goalLists={[
          { id: 1, name: "목표 1" },
          { id: 2, name: "목표 2" },
        ]}
      />
      <SideMenuUtilMenu />
      <SideMenuActions />

      {/* 프로필 및 알림 벨 영역 */}
      <div className="flex items-center gap-2 mt-6">
        <SideMenuProfile
          name="John Doe"
          email="john.doe@example.com"
          image="/images/sidemenu/profile.png"
        />

        {/* 프로필 우측 알림 버튼 팝오버 연동 (프로필 위쪽 방향) */}
        <Notification
          trigger={<SideMenuBell newNotification={newNotification} />}
          notifications={notifications}
          onMarkAsRead={onMarkAsRead}
          onMarkAllAsRead={onMarkAllAsRead}
          align="start"
          side="top"
          sideOffset={8}
        />
      </div>
    </m.div>
  );
}
