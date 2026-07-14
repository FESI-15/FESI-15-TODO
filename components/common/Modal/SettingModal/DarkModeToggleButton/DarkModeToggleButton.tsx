import Image from "next/image";
import { m } from "framer-motion";

interface DarkModeToggleButtonProps {
  isDarkMode: boolean;
  onToggle: (isDarkMode: boolean) => void;
}

export default function DarkModeToggleButton({
  isDarkMode,
  onToggle,
}: DarkModeToggleButtonProps) {
  return (
    <div className="mt-4">
      <p className="mb-2 text-sm font-semibold text-gray-700 md:text-base">
        다크 모드
      </p>
      <div className="p-2 flex items-center gap-2 w-[224px] relative">
        <div className="z-0 bg-gray-100 rounded-full p-2 w-full h-full absolute top-0 left-0">
          <m.div
            animate={{ x: isDarkMode ? 108 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut", type: "spring" }}
            className="bg-white rounded-full w-[100px] h-full"
          />
        </div>
        <button className="py-2 flex-1 z-10" onClick={() => onToggle(false)}>
          <Image
            className="mx-auto"
            src="/icons/modal/sun.svg"
            alt="sun"
            width={24}
            height={24}
          />
        </button>
        <button className="py-2 flex-1 z-10" onClick={() => onToggle(true)}>
          <Image
            className="mx-auto"
            src="/icons/modal/moon.svg"
            alt="moon"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}
