import SideMenuList from "./SideMenuList/SideMenuList";
import Image from "next/image";
import SideMenuUtilMenu from "./SideMenuUtilMenu/SideMenuUtilMenu";
import SideMenuActions from "./SideMenuActions/SideMenuActions";
import SideMenuProfile from "./SideMenuProfile/SideMenuProfile";
import * as m from "motion/react-m";
import SideMenuBell from "./SideMenuBell/SideMenuBell";

export default function SideMenuContainer() {
  return (
    <m.div
      className="flex flex-col md:justify-between flex-1"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.3,
          delay: 0.2,
        },
      }}
    >
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
      </div>
      <div>
        <SideMenuActions />
        {/* 인증, 인가 시스템 연동 시 profile 전달 */}
        <div className="flex items-center gap-2 mt-6">
          <SideMenuProfile
            name="John Doe"
            email="john.doe@example.com"
            image="/images/sidemenu/profile.png"
          />
          <SideMenuBell newNotification={true} onClickBell={() => {}} />
        </div>
      </div>
    </m.div>
  );
}
