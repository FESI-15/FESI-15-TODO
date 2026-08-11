import SideMenuList from "./SideMenuList/SideMenuList";
import Image from "next/image";
import SideMenuUtilMenu from "./SideMenuUtilMenu/SideMenuUtilMenu";
import SideMenuActions from "./SideMenuActions/SideMenuActions";
import SideMenuProfile from "./SideMenuProfile/SideMenuProfile";
import SideMenuBell from "./SideMenuBell/SideMenuBell";
import SlidLogo from "@/public/icons/sidemenu/Slid to-do.svg";

export default function SideMenuContainer({
  onClose,
}: {
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-col lg:justify-between flex-1">
      <div>
        <div className="flex items-center gap-4 pl-2 mb-10">
          <Image
            src="/icons/sidemenu/symbol.svg"
            alt="symbol"
            width={48}
            height={48}
          />
          <SlidLogo className="h-6 w-[140px] text-gray-700 dark:text-white" />
        </div>
        <SideMenuList onClose={onClose} />
        <SideMenuUtilMenu />
      </div>
      <div>
        <SideMenuActions />
        {/* 인증, 인가 시스템 연동 시 profile 전달 */}
        <div className="flex items-center gap-2 mt-6">
          <SideMenuProfile onClose={onClose} />
          <SideMenuBell />
        </div>
      </div>
    </div>
  );
}
