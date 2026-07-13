"use client";

import { useState } from "react";
import MobileSideMenu from "./MobileSideMenu/MobileSideMenu";
import TabletSideMenu from "./TabletSideMenu/TabletSideMenu";

export default function SideMenu() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <MobileSideMenu />
      <TabletSideMenu open={open} onToggle={handleToggle} />
    </div>
  );
}
