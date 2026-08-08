import Image from "next/image";
import SlidLogo from "@/public/icons/sidemenu/Slid to-do.svg";

export function AuthLogo() {
  return (
    <div className="flex items-center gap-4 px-2">
      <Image
        src="/icons/sidemenu/symbol.svg"
        alt="symbol"
        width={48}
        height={48}
      />
      <SlidLogo className="h-6 w-[140px] text-gray-700 dark:text-white" />
    </div>
  );
}
