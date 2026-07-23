"use client";

import { useState } from "react";
import MobileSideMenu from "./MobileSideMenu/MobileSideMenu";
import TabletSideMenu from "./TabletSideMenu/TabletSideMenu";

export default function SideMenu() {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="relative pt-[57px] md:pt-0">
      <MobileSideMenu />
      <TabletSideMenu open={open} onToggle={handleToggle} />
    </div>
  );
}
