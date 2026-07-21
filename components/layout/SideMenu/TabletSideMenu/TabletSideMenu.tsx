import SideMenuContainer from "../SideMenuContainer/SideMenuContainer";
import DoubleArrow from "@/public/icons/sidemenu/double_arrow.svg";
import SideBarUtils from "./SideBarUtills/SideBarUtils";
import * as m from "motion/react-m";
import { cva } from "class-variance-authority";

interface TabletSideMenuProps {
  open: boolean;
  onToggle: () => void;
}

const sideMenuSpaceVariants = cva("w-[60px]", {
  variants: {
    open: {
      true: "lg:w-[362px]",
      false: "lg:w-[60px]",
    },
  },
  defaultVariants: {
    open: false,
  },
});

export const tabletSideMenuButtonVariants = cva(
  "block text-gray-300 hover:text-gray-400",
  {
    variants: {
      open: {
        true: "mb-8 ml-auto rotate-180",
        false: "mb-0 mx-auto",
      },
    },
  },
);
export const tabletSideMenuVariants = cva(
  "hidden md:flex fixed top-0 left-0 bg-white rounded-r-[48px] shadow-xl z-50 h-screen flex-col",
  {
    variants: {
      open: {
        true: "p-8",
        false: "px-2.5 py-8 flex flex-col items-center",
      },
    },
  },
);

export default function TabletSideMenu({
  open,
  onToggle,
}: TabletSideMenuProps) {
  return (
    <>
      <div className={sideMenuSpaceVariants({ open })} />
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
