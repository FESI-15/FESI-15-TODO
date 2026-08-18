import SideMenuContainer from "../SideMenuContainer/SideMenuContainer";
import DoubleArrow from "@/public/icons/sidemenu/double_arrow.svg";
import SideBarUtils from "./SideBarUtills/SideBarUtils";
import { cva } from "class-variance-authority";

interface TabletSideMenuProps {
  open: boolean;
  onToggle: () => void;
}

const sideMenuSpaceVariants = cva("hidden lg:block", {
  variants: {
    open: {
      true: "w-[320px]",
      false: "w-[60px]",
    },
  },
  defaultVariants: {
    open: false,
  },
});

export const tabletSideMenuButtonVariants = cva(
  "block text-gray-300 hover:text-gray-400 dark:text-muted-foreground dark:hover:text-foreground",
  {
    variants: {
      open: {
        true: "mb-4 ml-auto rotate-180",
        false: "mb-0 mx-auto",
      },
    },
  },
);
export const tabletSideMenuVariants = cva(
  "hidden lg:flex fixed top-0 left-0 bg-white dark:bg-sidebar rounded-r-[48px] shadow-xl z-50 h-screen flex-col",
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
      <div className={tabletSideMenuVariants({ open })}>
        <button
          type="button"
          onClick={onToggle}
          className={tabletSideMenuButtonVariants({ open })}
        >
          <DoubleArrow className="size-8" />
        </button>
        {open ? <SideMenuContainer /> : <SideBarUtils />}
      </div>
    </>
  );
}
