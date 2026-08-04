import Image from "next/image";
import { cva } from "class-variance-authority";
import type { GetTeamIdNotifications200NotificationsItem } from "@/apis/model";
import {
  getNotificationCommentContent,
  getNotificationUserImage,
} from "@/types/notification";
import { getRelativeCreatedTime } from "@/utils/getRelativeCreatedTime";

const notificationDotVariants = cva("mt-1.5 size-1.5 shrink-0 rounded-full", {
  variants: {
    isRead: {
      false: "bg-orange-500",
    },
  },
});

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
      className="flex w-full items-start gap-2 rounded-2xl px-2 py-3 text-left transition-colors hover:bg-gray-50"
    >
      <span
        className={notificationDotVariants({ isRead: notification.isRead })}
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
            src={userImage || "/images/sidemenu/profile.png"}
            alt="profile"
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
      </div>
    </button>
  );
}
