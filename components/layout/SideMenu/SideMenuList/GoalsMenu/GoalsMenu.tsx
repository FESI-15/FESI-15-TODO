import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  sideMenuListIconVariants,
  sideMenuListTextVariants,
  type SideMenuListIconVariantProps,
  type SideMenuListTextVariantProps,
} from "../sideMenuListVariants";
import GoalsMenuList from "./GoalsMenuList/GoalsMenuList";

type GoalsMenuProps = {
  goalLists: any;
  item: {
    icon: React.ElementType;
    name: string;
    href: string;
  };
  isActivePath: (href: string) => boolean;
} & SideMenuListTextVariantProps &
  SideMenuListIconVariantProps;

export default function GoalsMenu({
  goalLists,
  item,
  isActivePath,
}: GoalsMenuProps) {
  const [isGoalListOpen, setIsGoalListOpen] = useState(false);
  const isActive = isActivePath(item.href);

  return (
    <>
      <button
        type="button"
        className={sideMenuListTextVariants({
          isActive,
        })}
        onClick={() => setIsGoalListOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <item.icon
            className={sideMenuListIconVariants({
              isActive,
            })}
          />
          <span className="text-lg font-semibold">{item.name}</span>
        </div>
        <Image
          className={isGoalListOpen ? "rotate-180" : ""}
          src="/icons/common/chevron-down.svg"
          alt="chevron-down"
          width={24}
          height={24}
        />
      </button>
      {isGoalListOpen && <GoalsMenuList goalLists={goalLists} />}
    </>
  );
}
