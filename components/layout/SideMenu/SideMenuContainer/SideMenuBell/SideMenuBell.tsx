import { HTMLAttributes, forwardRef } from "react";
import Bell from "@/public/icons/header/bell.svg";

interface SideMenuBellProps extends HTMLAttributes<HTMLButtonElement> {
  newNotification: boolean;
}

// forwardRef를 입혀 팝오버의 Trigger 엘리먼트 역할을 할 수 있도록 확장
export const SideMenuBell = forwardRef<HTMLButtonElement, SideMenuBellProps>(
  ({ newNotification, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className="relative hidden p-4 border border-gray-200 rounded-full md:block"
        type="button"
        {...props}
      >
        {newNotification && (
          <span className="absolute top-0 right-1 w-3 h-3 bg-orange-500 rounded-full" />
        )}
        <Bell className="text-gray-500" width={24} height={24} />
      </button>
    );
  },
);

SideMenuBell.displayName = "SideMenuBell";
