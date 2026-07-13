import Image from "next/image";
import NotificationBell from "@/components/common/NotificationBell";

interface SideBarUtilsProps {
  onClickBell: () => void;
  newNotification: boolean;
}
export default function SideBarUtils({
  onClickBell,
  newNotification,
}: SideBarUtilsProps) {
  return (
    <div className="mt-10 flex flex-col items-center gap-8">
      <Image
        src="/icons/sidemenu/symbol.svg"
        alt="symbol"
        width={32}
        height={32}
      />
      <NotificationBell
        onClickBell={onClickBell}
        newNotification={newNotification}
      />
    </div>
  );
}
