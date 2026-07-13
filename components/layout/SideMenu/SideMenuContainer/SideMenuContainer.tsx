import SideMenuList from "../SideMenuList/SideMenuList";
import Image from "next/image";
import SideMenuUtilMenu from "../SideMenuUtilMenu/SideMenuUtilMenu";
import SideMenuActions from "../SideMenuActions/SideMenuActions";
import SideMenuProfile from "../SideMenuProfile/SideMenuProfile";
import * as m from "motion/react-m";
export default function SideMenuContainer() {
  return (
    <m.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.3,
          delay: 0.1,
        },
      }}
    >
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
      <SideMenuList
        // 인증, 인가 시스템 연동 시 goallists 전달
        goalLists={[
          {
            id: 1,
            name: "목표 1",
          },
          {
            id: 2,
            name: "목표 2",
          },
        ]}
      />
      <SideMenuUtilMenu />
      <SideMenuActions />
      <SideMenuProfile
        name="John Doe"
        email="john.doe@example.com"
        image="/images/sidemenu/profile.png"
      />
    </m.div>
  );
}
