"use client";

import Image from "next/image";
import { NotificationItemType } from "@/types/notification";
import {
  formatRelativeTime,
  getNotificationImage,
  getNotificationSubText,
} from "@/utils";
import { notificationItemVariants } from "./Notification.variants";

interface NotificationItemProps {
  notification: NotificationItemType;
  onRead: (id: number) => void;
}

export function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  const { id, message, isRead, createdAt } = notification;

  const imageSrc = getNotificationImage(notification);
  const subText = getNotificationSubText(notification);

  const handleClick = () => {
    if (!isRead) {
      onRead(id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleClick();
        }
      }}
      className={notificationItemVariants()}
    >
      {/* 안 읽음 표시 뱃지 */}
      <div className="mt-1 flex h-3 w-3 shrink-0 items-center justify-center">
        {!isRead && <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />}
      </div>

      {/* 알림 본문 영역 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <p className="text-sm font-medium leading-snug text-gray-700 break-keep">
          {message}
        </p>
        {subText && (
          <p className="mt-0.5 truncate text-sm font-normal text-gray-500">
            {subText}
          </p>
        )}
        <p className="mt-1 text-xs font-normal text-gray-400">
          {formatRelativeTime(createdAt)}
        </p>
      </div>

      {/* 우측 프로필/첨부 이미지 */}
      <Image
        src={imageSrc}
        alt=""
        width={40}
        height={40}
        className="ml-2 h-10 w-10 shrink-0 self-center rounded-full border border-gray-100 object-cover"
      />
    </div>
  );
}
