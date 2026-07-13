import { div } from "motion/react-client";
import { createPortal } from "react-dom";
import SideMenuContainer from "../SideMenuContainer/SideMenuContainer";
import Image from "next/image";
import Bell from "@/public/icons/header/bell.svg";
import {
  tabletSideMenuButtonVariants,
  tabletSideMenuVariants,
} from "./TabletSideMenuVariants";
import SideBarUtils from "./SideBarUtills/SideBarUtils";
import * as m from "motion/react-m";

type TabletSideMenuProps = {
  open: boolean;
  onToggle: () => void;
};

export default function TabletSideMenu({
  open,
  onToggle,
}: TabletSideMenuProps) {
  return (
    <>
      <div className="lg:w-[362px] md:w-[60px]" />
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
          <Image
            src="/icons/sidemenu/double_arrow.svg"
            alt="double_arrow"
            width={24}
            height={24}
          />
        </button>
        {open ? (
          <SideMenuContainer />
        ) : (
          <SideBarUtils onClickBell={() => {}} newNotification={true} />
        )}
      </m.div>
    </>
  );
}
