"use client";

import Header from "./Header/Header";
import { useState } from "react";
import Delete from "@/public/icons/common/delete.svg";
import SideMenuContainer from "../SideMenuContainer/SideMenuContainer";

export default function MobileSideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="block md:hidden">
      <Header
        title="모바일 사이드 메뉴"
        onClickHamburger={handleOpen}
        onClickBell={() => {}}
      />
      {isOpen && (
        <aside className="fixed top-0 left-0 flex h-full w-full flex-col bg-white z-50 py-4 px-5 overflow-y-auto">
          <button
            type="button"
            className="ml-auto mb-6 block"
            onClick={handleClose}
          >
            <Delete className="w-6 h-6 text-gray-400" />
          </button>
          <SideMenuContainer />
        </aside>
      )}
    </div>
  );
}
