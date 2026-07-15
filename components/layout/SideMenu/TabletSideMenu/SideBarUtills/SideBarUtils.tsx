import Image from "next/image";
import { NotificationBell } from "@/components/common/NotificationBell";
import { Notification } from "@/components/common/notification/Notification";
import { NotificationItemType } from "@/types/notification";

interface SideBarUtilsProps {
  notifications: NotificationItemType[];
  newNotification: boolean;
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

export default function SideBarUtils({
  notifications,
  newNotification,
  onMarkAsRead,
  onMarkAllAsRead,
}: SideBarUtilsProps) {
  return (
    <div className="mt-10 flex flex-col items-center gap-8">
      <Image
        src="/icons/sidemenu/symbol.svg"
        alt="symbol"
        width={32}
        height={32}
      />
      {/* 벨 아이콘을 트리거로 감싸서 팝오버 연결 */}
      <Notification
        trigger={<NotificationBell newNotification={newNotification} />}
        notifications={notifications}
        onMarkAsRead={onMarkAsRead}
        onMarkAllAsRead={onMarkAllAsRead}
        align="start" /* 왼쪽 기준으로 정렬 정돈 */
        side="right" /* 접혀있는 사이드바 우측으로 팝오버가 펼쳐지도록 세팅 */
        sideOffset={8}
      />
    </div>
  );
}
