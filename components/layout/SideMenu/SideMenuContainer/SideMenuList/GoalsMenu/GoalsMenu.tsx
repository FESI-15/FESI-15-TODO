import Image from "next/image";
import { useState } from "react";
import {
  sideMenuListIconVariants,
  sideMenuListTextVariants,
} from "../sideMenuListVariants";
import GoalsMenuList from "./GoalsMenuList/GoalsMenuList";
import { VariantProps } from "class-variance-authority";

interface GoalsMenuProps
  extends
    VariantProps<typeof sideMenuListTextVariants>,
    VariantProps<typeof sideMenuListIconVariants> {
  goalLists: {
    id: number;
    name: string;
  }[];
  item: {
    icon: React.ElementType;
    name: string;
    href: string;
  };
  isActivePath: (href: string) => boolean;
}

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
