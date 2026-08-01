"use client";

import { useEffect, useRef, useState } from "react";
import {
  useGetNotifications,
  usePatchNotification,
  usePatchNotifications,
} from "@/hooks/queries/notifications/notifications.bff.hook";

const NOTIFICATION_LIST_LIMIT = 20;

export const useNotificationCenter = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data } = useGetNotifications({ limit: NOTIFICATION_LIST_LIMIT });
  const { mutate: markAllRead } = usePatchNotifications();
  const { mutate: markOneRead } = usePatchNotification();

  const notifications = data?.data.notifications ?? [];
  const hasUnread = notifications.some((notification) => !notification.isRead);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const toggleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleMarkAllRead = () => {
    if (!hasUnread) {
      return;
    }

    markAllRead();
  };

  const handleMarkOneRead = (notificationId: number) => {
    const target = notifications.find(
      (notification) => notification.id === notificationId,
    );

    if (!target || target.isRead) {
      return;
    }

    markOneRead({ notificationId, data: { isRead: true } });
  };

  return {
    open,
    containerRef,
    toggleOpen,
    notifications,
    hasUnread,
    onMarkAllRead: handleMarkAllRead,
    onMarkOneRead: handleMarkOneRead,
  };
};
