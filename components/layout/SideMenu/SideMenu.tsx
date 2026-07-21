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
    <div className="relative">
      <MobileSideMenu />
      <TabletSideMenu open={open} onToggle={handleToggle} />
    </div>
  );
}
