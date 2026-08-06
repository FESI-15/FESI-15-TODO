import { useEffect, useRef } from "react";
import { cva } from "class-variance-authority";
import type { GetTeamIdNotifications200NotificationsItem } from "@/apis/model";
import { cn } from "@/utils/cn";
import NotificationItem from "./NotificationItem";

const markAllReadButtonVariants = cva("text-xs font-semibold", {
  variants: {
    hasUnread: {
      true: "text-orange-500",
      false: "text-gray-300",
    },
  },
});

interface NotificationPagination {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
}

interface NotificationPanelProps {
  notifications: GetTeamIdNotifications200NotificationsItem[];
  hasUnread: boolean;
  onMarkAllRead: () => void;
  onItemClick: (notificationId: number) => void;
  pagination?: NotificationPagination;
  className?: string;
}

export default function NotificationPanel({
  notifications,
  hasUnread,
  onMarkAllRead,
  onItemClick,
  pagination,
  className,
}: NotificationPanelProps) {
  const { hasNextPage, isFetchingNextPage, onLoadMore } = pagination ?? {};
  const scrollRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scrollRef.current;
    const target = loadMoreRef.current;

    if (!root || !target || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          onLoadMore?.();
        }
      },
      {
        root,
        rootMargin: "100px",
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  return (
    <div
      className={cn(
        "flex w-[320px] flex-col gap-4 rounded-3xl border border-gray-200 bg-white px-3 py-5 shadow-[0_0_30px_0_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <div className="flex items-center justify-between px-2">
        <p className="text-sm font-semibold tracking-[-0.03em] text-gray-700">
          알림
        </p>
        <button
          type="button"
          onClick={onMarkAllRead}
          disabled={!hasUnread}
          className={markAllReadButtonVariants({ hasUnread })}
        >
          모두 읽기
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="py-12 text-center text-sm font-medium text-gray-500">
          아직 알림이 없어요
        </p>
      ) : (
        <div
          ref={scrollRef}
          className="flex max-h-[360px] flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-transparent"
        >
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClick={onItemClick}
            />
          ))}
          <div ref={loadMoreRef} />
        </div>
      )}
    </div>
  );
}
