import SideMenuList from "../SideMenuList/SideMenuList";
import Image from "next/image";
import SideMenuUtillMenu from "../SideMenuUtillMenu/SideMenuUtillMenu";
import SideMenuActions from "../SideMenuActions/SideMenuActions";
import SideMenuProfile from "../SideMenuProfile/SideMenuProfile";
export default function SideMenuContainer() {
  return (
    <div>
      <div className="flex items-center gap-4 pl-2 mb-10">
        <Image
          src="/icons/sidemenu/symbol.svg"
          alt="symbol"
          width={48}
          height={48}
        />
        <Image
          src="/icons/sidemenu/Slid to-do.svg"
          alt="Slid to-do"
          width={140}
          height={24}
        />
      </div>
      <SideMenuList />
      <SideMenuUtillMenu />
      <SideMenuActions />
      <SideMenuProfile
        name="John Doe"
        email="john.doe@example.com"
        image="/images/sidemenu/profile.png"
      />
    </div>
  );
}
