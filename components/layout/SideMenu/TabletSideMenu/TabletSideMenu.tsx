// components/layout/SideMenu/TabletSideMenu/TabletSideMenu.tsx
import SideMenuContainer from "../SideMenuContainer/SideMenuContainer";
import DoubleArrow from "@/public/icons/sidemenu/double_arrow.svg";
import {
  tabletSideMenuButtonVariants,
  tabletSideMenuVariants,
} from "./TabletSideMenuVariants";
import SideBarUtils from "./SideBarUtills/SideBarUtils";
import * as m from "motion/react-m";
import { NotificationItemType } from "@/types/notification";

interface TabletSideMenuProps {
  open: boolean;
  onToggle: () => void;
  notifications: NotificationItemType[];
  newNotification: boolean;
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

export default function TabletSideMenu({
  open,
  onToggle,
  notifications,
  newNotification,
  onMarkAsRead,
  onMarkAllAsRead,
}: TabletSideMenuProps) {
  return (
    <>
      <div className="md:w-[60px] lg:w-[362px]" />
      <m.div
        className={tabletSideMenuVariants({ open })}
        animate={{
          width: open ? "362px" : "60px",
          transition: {
            duration: 0.3,
            ease: "easeInOut",
          },
        }}
      >
        <button
          type="button"
          onClick={onToggle}
          className={tabletSideMenuButtonVariants({ open })}
        >
          <DoubleArrow />
        </button>
        {open ? (
          /* 데스크탑/태블릿 오픈 상태: SideMenuContainer 내부(SideMenuBell)에서 별도 알림 처리 */
          <SideMenuContainer />
        ) : (
          /* 접힌 상태: SideBarUtils에 알림 데이터 연동 */
          <SideBarUtils
            notifications={notifications}
            newNotification={newNotification}
            onMarkAsRead={onMarkAsRead}
            onMarkAllAsRead={onMarkAllAsRead}
          />
        )}
      </m.div>
    </>
  );
}
