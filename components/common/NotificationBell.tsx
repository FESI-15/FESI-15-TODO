"use client";

import Bell from "@/public/icons/header/bell.svg";
import NotificationPanel from "@/components/common/NotificationPanel/NotificationPanel";
import { useNotificationCenter } from "@/hooks/useNotificationCenter";
import { cn } from "@/utils/cn";

interface NotificationBellProps {
  panelClassName?: string;
}

export default function NotificationBell({
  panelClassName,
}: NotificationBellProps) {
  const {
    open,
    containerRef,
    toggleOpen,
    notifications,
    hasUnread,
    onMarkAllRead,
    onMarkOneRead,
    hasNextPage,
    isFetchingNextPage,
    onLoadMore,
  } = useNotificationCenter();

  return (
    <div ref={containerRef} className="relative">
      <button className="relative" type="button" onClick={toggleOpen}>
        {hasUnread && (
          <span className="absolute top-0 right-0.5 w-2 h-2 bg-orange-500 rounded-full" />
        )}
        <Bell className="text-gray-400" width={24} height={24} />
      </button>
      {open && (
        <NotificationPanel
          notifications={notifications}
          hasUnread={hasUnread}
          onMarkAllRead={onMarkAllRead}
          onItemClick={onMarkOneRead}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={onLoadMore}
          className={cn("absolute top-full right-0 z-50 mt-2", panelClassName)}
        />
      )}
    </div>
  );
}
