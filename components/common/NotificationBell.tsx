import { HTMLAttributes, forwardRef } from "react";
import Bell from "@/public/icons/header/bell.svg";
interface NotificationBellProps extends HTMLAttributes<HTMLButtonElement> {
  newNotification: boolean;
}
// PopoverTrigger가 내부 ref를 추적할 수 있도록 forwardRef로 감쌈
export const NotificationBell = forwardRef<
  HTMLButtonElement,
  NotificationBellProps
>(({ newNotification, ...props }, ref) => {
  return (
    <button ref={ref} className="relative" type="button" {...props}>
      {newNotification && (
        <span className="absolute top-0 right-0.5 h-2 w-2 rounded-full bg-orange-500" />
      )}
      <Bell className="text-gray-400" width={24} height={24} />
    </button>
  );
});

NotificationBell.displayName = "NotificationBell";
