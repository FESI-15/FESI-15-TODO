"use client";

import { useState } from "react";
import MobileSideMenu from "./MobileSideMenu/MobileSideMenu";
import TabletSideMenu from "./TabletSideMenu/TabletSideMenu";
import { useNotificationState } from "@/hooks/useNotificationState";

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const { notifications, hasUnread, handleMarkAsRead, handleMarkAllAsRead } =
    useNotificationState();

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* 1. 모바일 사이드메뉴 상태 바인딩 */}
      <MobileSideMenu />
      {/* 2. 태블릿/데스크탑 사이드메뉴 상태 바인딩 */}
      <TabletSideMenu
        open={open}
        onToggle={handleToggle}
        notifications={notifications}
        newNotification={hasUnread}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </div>
  );
}
