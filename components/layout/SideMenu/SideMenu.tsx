"use client";
const DESKTOP_BREAKPOINT = 1024;

import { useEffect, useState } from "react";
import MobileSideMenu from "./MobileSideMenu/MobileSideMenu";
import TabletSideMenu from "./TabletSideMenu/TabletSideMenu";

export default function SideMenu() {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${DESKTOP_BREAKPOINT}px)`,
    );

    const handleChange = (event: MediaQueryListEvent) => {
      setOpen(!event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div className="relative pt-[57px] md:pt-0">
      <MobileSideMenu />
      <TabletSideMenu open={open} onToggle={handleToggle} />
    </div>
  );
}
