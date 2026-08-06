"use client";

import { useState, useSyncExternalStore } from "react";
import MobileSideMenu from "./MobileSideMenu/MobileSideMenu";
import TabletSideMenu from "./TabletSideMenu/TabletSideMenu";

const DESKTOP_MEDIA_QUERY = "(min-width: 1025px)";

const subscribeDesktop = (callback: () => void) => {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

  mediaQuery.addEventListener("change", callback);

  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
};

const getDesktopSnapshot = () => {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
};

const getServerSnapshot = () => {
  return false;
};

export default function SideMenu() {
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getServerSnapshot,
  );

  const [isTabletMenuOpen, setIsTabletMenuOpen] = useState(false);

  const open = isDesktop || isTabletMenuOpen;

  const handleToggle = () => {
    setIsTabletMenuOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="relative pt-[57px] md:pt-0">
      <MobileSideMenu />
      <TabletSideMenu open={open} onToggle={handleToggle} />
    </div>
  );
}
