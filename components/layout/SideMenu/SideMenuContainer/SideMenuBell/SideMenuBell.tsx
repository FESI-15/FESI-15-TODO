"use client";

import Bell from "@/public/icons/header/bell.svg";
import NotificationPanel from "@/components/common/NotificationPanel/NotificationPanel";
import { useNotificationCenter } from "@/hooks/useNotificationCenter";

export default function SideMenuBell() {
  const {
    open,
    containerRef,
    toggleOpen,
    notifications,
    hasUnread,
    hasNextPage,
    isFetchingNextPage,
    onLoadMore,
  } = useNotificationCenter();

  return (
    <div ref={containerRef} className="relative hidden lg:block">
      <button
        className="relative block rounded-full border border-gray-200 dark:border-border p-4"
        type="button"
        onClick={toggleOpen}
      >
        {hasUnread && (
          <span className="absolute top-0 right-1 w-3 h-3 bg-orange-500 rounded-full" />
        )}
        <Bell
          className="text-gray-500 dark:text-muted-foreground"
          width={24}
          height={24}
        />
      </button>
      {open && (
        <NotificationPanel
          notifications={notifications}
          hasUnread={hasUnread}
          pagination={{ hasNextPage, isFetchingNextPage, onLoadMore }}
          className="absolute bottom-0 left-full z-50 ml-2"
        />
      )}
    </div>
  );
}
