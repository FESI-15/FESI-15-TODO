import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  sideMenuListIconVariants,
  sideMenuListTextVariants,
} from "../sideMenuListVariants";
import GoalsMenuList from "./GoalsMenuList/GoalsMenuList";
import { VariantProps } from "class-variance-authority";
import { useGetGoals } from "@/hooks/queries/goals/goals.bff.hook";
import { showSaveFailureToast } from "@/utils/toast";

interface GoalsMenuProps
  extends
    VariantProps<typeof sideMenuListTextVariants>,
    VariantProps<typeof sideMenuListIconVariants> {
  item: {
    icon: React.ElementType;
    name: string;
    href: string;
  };
  isActivePath: (href: string) => boolean;
  onClose?: () => void;
}

export default function GoalsMenu({
  item,
  isActivePath,
  onClose,
}: GoalsMenuProps) {
  const { data: goals } = useGetGoals();
  const [isGoalListOpen, setIsGoalListOpen] = useState(false);
  const isActive = isActivePath(item.href);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsGoalListOpen(false);
    onClose?.();
  };

  const handleClick = () => {
    if (goals?.data.goals.length === 0) {
      return showSaveFailureToast("목표를 생성해주세요.");
    }
    setIsGoalListOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isGoalListOpen
      ) {
        setIsGoalListOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isGoalListOpen]);

  return (
    <li>
      <div className="relative">
        <button
          type="button"
          className={sideMenuListTextVariants({
            isActive,
          })}
          onClick={handleClick}
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
            className={
              isGoalListOpen ? "rotate-180 lg:-rotate-90" : "lg:-rotate-90"
            }
            src="/icons/common/chevron-down.svg"
            alt="chevron-down"
            width={24}
            height={24}
          />
        </button>
        {isGoalListOpen && (
          <div
            className="mt-2 lg:absolute right-[-200px] lg:border lg:border-gray-200 lg:shadow-lg overflow-hidden lg:rounded-lg top-0 lg:bg-white lg:dark:bg-background"
            ref={menuRef}
          >
            <GoalsMenuList
              goals={goals?.data.goals || []}
              onClose={handleClose}
            />
          </div>
        )}
      </div>
    </li>
  );
}
