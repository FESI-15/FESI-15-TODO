import SideMenuContainer from "../SideMenuContainer/SideMenuContainer";
import Image from "next/image";
import DoubleArrow from "@/public/icons/sidemenu/double_arrow.svg";
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
          <DoubleArrow />
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
