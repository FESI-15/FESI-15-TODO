"use client";

import { useState } from "react";
import MobileSideMenu from "./MobileSideMenu/MobileSideMenu";
import TabletSideMenu from "./TabletSideMenu/TabletSideMenu";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="relative pt-[64px] lg:pt-0">
      <MobileSideMenu />
      <TabletSideMenu open={isOpen} onToggle={handleToggle} />
    </div>
  );
}
