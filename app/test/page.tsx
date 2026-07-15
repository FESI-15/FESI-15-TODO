"use client";

import { Notification } from "@/components/common/notification/Notification";
import { NotificationBell } from "@/components/common/NotificationBell";
import { useNotificationState } from "@/hooks/useNotificationState";

export default function TestNotificationPage() {
  const { notifications, hasUnread, handleMarkAsRead, handleMarkAllAsRead } =
    useNotificationState();

  return (
    <div className="flex h-screen items-start justify-end p-10 bg-slate-50">
      <Notification
        trigger={<NotificationBell newNotification={hasUnread} />}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        align="end"
        side="bottom"
        sideOffset={8}
      />
    </div>
  );
}
