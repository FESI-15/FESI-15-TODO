"use client";

import { useEffect, useRef, useState } from "react";
import { useGetNotificationsInfinite } from "@/hooks/queries/notifications/notifications.bff.hook";
import type { Notification } from "@/types/notification";

const NOTIFICATION_LIST_LIMIT = 10;

export const useNotificationCenter = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data } = useGetNotificationsInfinite({
    limit: NOTIFICATION_LIST_LIMIT,
  });

  const notifications = (data?.pages.flatMap((page) => page.notifications) ??
    []) as Notification[];
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

  return {
    open,
    containerRef,
    toggleOpen,
    hasUnread,
  };
};
