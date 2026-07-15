"use client";

import { useState } from "react";
import { Notification } from "@/components/common/notification/Notification";
import { NotificationItemType } from "@/types/notification";

const MOCK_NOTIFICATIONS: NotificationItemType[] = [];

export default function TestNotificationPage() {
  const [notifications, setNotifications] =
    useState<NotificationItemType[]>(MOCK_NOTIFICATIONS);

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="flex justify-end p-10">
      <Notification
        trigger={
          <button type="button" className="bg-red-500">
            테스트 벨
          </button>
        }
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </div>
  );
}
