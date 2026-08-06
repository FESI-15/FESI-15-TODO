"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  patchNotification,
  patchNotifications,
} from "@/apis/notifications/notificationsBff";
import { useGetNotificationsInfinite } from "@/hooks/queries/notifications/notifications.bff.hook";
import { notificationsKeys } from "@/hooks/queries/notifications/notifications.key";
import type { Notification } from "@/types/notification";

const NOTIFICATION_LIST_LIMIT = 10;

export const useNotificationCenter = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetNotificationsInfinite({ limit: NOTIFICATION_LIST_LIMIT });

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

  const handleMarkAllRead = async () => {
    if (!hasUnread) {
      return;
    }

    await patchNotifications();
    queryClient.invalidateQueries({ queryKey: notificationsKeys.all() });
  };

  const handleMarkOneRead = async (notificationId: number) => {
    const target = notifications.find(
      (notification) => notification.id === notificationId,
    );

    if (!target || target.isRead) {
      return;
    }

    await patchNotification({ notificationId, data: { isRead: true } });
    queryClient.invalidateQueries({ queryKey: notificationsKeys.all() });
  };

  return {
    open,
    containerRef,
    toggleOpen,
    notifications,
    hasUnread,
    onMarkAllRead: handleMarkAllRead,
    onMarkOneRead: handleMarkOneRead,
    hasNextPage,
    isFetchingNextPage,
    onLoadMore: fetchNextPage,
  };
};
