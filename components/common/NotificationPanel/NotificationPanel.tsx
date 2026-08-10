import { useEffect, useRef } from "react";
import { cva } from "class-variance-authority";
import { usePatchNotifications } from "@/hooks/queries/notifications/notifications.bff.hook";
import type { Notification } from "@/types/notification";
import { cn } from "@/utils/cn";
import NotificationItem from "./NotificationItem";

const markAllReadButtonVariants = cva("text-xs font-semibold", {
  variants: {
    hasUnread: {
      true: "text-orange-500",
      false: "text-gray-300 dark:text-muted-foreground",
    },
  },
});

interface NotificationPagination {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
}

interface NotificationPanelProps {
  notifications: Notification[];
  hasUnread: boolean;
  pagination?: NotificationPagination;
  className?: string;
}

export default function NotificationPanel({
  notifications,
  hasUnread,
  pagination,
  className,
}: NotificationPanelProps) {
  const { hasNextPage, isFetchingNextPage, onLoadMore } = pagination ?? {};

  const { mutate: markAllRead } = usePatchNotifications();

  const handleMarkAllRead = () => {
    if (!hasUnread) {
      return;
    }

    markAllRead();
  };

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
        "flex w-[320px] flex-col gap-4 rounded-3xl border border-gray-200 dark:border-border bg-white dark:bg-popover px-3 py-5 shadow-[0_0_30px_0_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <div className="flex items-center justify-between px-2">
        <p className="text-sm font-semibold tracking-[-0.03em] text-gray-700 dark:text-foreground">
          알림
        </p>
        <button
          type="button"
          onClick={handleMarkAllRead}
          disabled={!hasUnread}
          className={markAllReadButtonVariants({ hasUnread })}
        >
          모두 읽기
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="py-12 text-center text-sm font-medium text-gray-500 dark:text-muted-foreground">
          아직 알림이 없어요
        </p>
      ) : (
        <div
          ref={scrollRef}
          className="flex max-h-[360px] flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-track]:bg-transparent"
        >
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
          <div ref={loadMoreRef} />
        </div>
      )}
    </div>
  );
}
