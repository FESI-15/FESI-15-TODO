import Image from "next/image";
import NotificationBell from "@/components/common/NotificationBell";

export default function SideBarUtils() {
  return (
    <div className="mt-10 flex flex-col items-center gap-8">
      <Image
        src="/icons/sidemenu/symbol.svg"
        alt="symbol"
        width={32}
        height={32}
      />
      <NotificationBell panelClassName="absolute top-0 left-full z-50 ml-2" />
    </div>
  );
}
