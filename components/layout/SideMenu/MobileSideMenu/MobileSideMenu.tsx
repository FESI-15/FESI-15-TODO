"use client";

import Header from "./Header/Header";
import { useState } from "react";
import Delete from "@/public/icons/common/delete.svg";
import SideMenuContainer from "../SideMenuContainer/SideMenuContainer";
import { NotificationItemType } from "@/types/notification";

interface MobileSideMenuProps {
  notifications: NotificationItemType[];
  newNotification: boolean;
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

export default function MobileSideMenu({
  notifications,
  newNotification,
  onMarkAsRead,
  onMarkAllAsRead,
}: MobileSideMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="block md:hidden">
      {/* 1. 상단 모바일 헤더 */}
      <Header
        title="체다치즈"
        onClickHamburger={handleOpen}
        notifications={notifications}
        newNotification={newNotification}
        onMarkAsRead={onMarkAsRead}
        onMarkAllAsRead={onMarkAllAsRead}
      />

      {/* 2. 햄버거를 누르면 열리는 슬라이드 오버레이 */}
      {isOpen && (
        <aside className="fixed top-0 left-0 w-full h-full bg-white z-50 py-4 px-5 overflow-y-auto">
          {/* 우측 상단 X 닫기 버튼 */}
          <button
            type="button"
            className="ml-auto mb-6 block"
            onClick={handleClose}
          >
            <Delete className="w-6 h-6 text-gray-400" />
          </button>

          {/* 사이드바 메뉴 내용물 */}
          <SideMenuContainer
            notifications={notifications}
            newNotification={newNotification}
            onMarkAsRead={onMarkAsRead}
            onMarkAllAsRead={onMarkAllAsRead}
          />
        </aside>
      )}
    </div>
  );
}
