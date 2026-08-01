import Image from "next/image";
import type { GetTeamIdNotifications200NotificationsItem } from "@/apis/model";
import {
  getNotificationCommentContent,
  getNotificationUserImage,
} from "@/types/notification";
import { getRelativeCreatedTime } from "@/utils/getRelativeCreatedTime";
import { cn } from "@/utils/cn";

const DEFAULT_NOTIFICATION_AVATAR = "/images/sidemenu/profile.png";

interface NotificationItemProps {
  notification: GetTeamIdNotifications200NotificationsItem;
  onClick: (notificationId: number) => void;
}

export default function NotificationItem({
  notification,
  onClick,
}: NotificationItemProps) {
  const commentContent = getNotificationCommentContent(notification.data);
  const userImage = getNotificationUserImage(notification.data);

  return (
    <button
      type="button"
      onClick={() => onClick(notification.id)}
      className="flex w-full items-start gap-2 rounded-2xl px-2 py-3 text-left"
    >
      <span
        className={cn(
          "mt-1.5 size-1.5 shrink-0 rounded-full",
          !notification.isRead && "bg-orange-500",
        )}
      />
      <div className="flex flex-1 items-center gap-3">
        <div className="flex flex-1 flex-col gap-1">
          <p className="line-clamp-2 text-sm font-medium tracking-[-0.03em] text-gray-700">
            {notification.message}
          </p>
          {commentContent && (
            <p className="truncate text-sm text-gray-500">
              &ldquo;{commentContent}&rdquo;
            </p>
          )}
          <p className="text-xs text-gray-400">
            {getRelativeCreatedTime(notification.createdAt)}
          </p>
        </div>
        <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
          <Image
            src={userImage || DEFAULT_NOTIFICATION_AVATAR}
            alt=""
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
      </div>
    </button>
  );
}
