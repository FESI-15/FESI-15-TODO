"use client";

import MobileSideMenu from "./MobileSideMenu/MobileSideMenu";
import TabletSideMenu from "./TabletSideMenu/TabletSideMenu";
import { useSideMenu } from "./SideMenuContext";

export default function SideMenu() {
  const { open, onToggle } = useSideMenu();

  return (
    <div className="relative pt-[57px] md:pt-0">
      <MobileSideMenu />
      <TabletSideMenu open={open} onToggle={onToggle} />
    </div>
  );
}
