"use client";

import Image from "next/image";
import { NotificationBell } from "@/components/common/NotificationBell";
import { Notification } from "@/components/common/notification/Notification";
import { NotificationItemType } from "@/types/notification";

interface HeaderProps {
  title: string;
  onClickHamburger: () => void;
  notifications: NotificationItemType[];
  newNotification: boolean;
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

export default function Header({
  title,
  onClickHamburger,
  notifications,
  newNotification,
  onMarkAsRead,
  onMarkAllAsRead,
}: HeaderProps) {
  return (
    <header className="bg-white py-4 px-5 border-b border-gray-200 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onClickHamburger}>
          <Image
            src="/icons/header/hamburger.svg"
            alt="hamburger"
            width={24}
            height={24}
          />
        </button>
        <h1 className="text-base font-semibold text-gray-700">
          {title}님의 대시보드
        </h1>
      </div>

      {/* 팝오버 연결: 알림창이 벨 기준 우측 끝선(align="end")과 아래 방향(side="bottom")에 맞춰 렌더링 */}
      <Notification
        trigger={<NotificationBell newNotification={newNotification} />}
        notifications={notifications}
        onMarkAsRead={onMarkAsRead}
        onMarkAllAsRead={onMarkAllAsRead}
        align="end"
        side="bottom"
        sideOffset={8}
      />
    </header>
  );
}
