import Image from "next/image";
import Bell from "@/public/icons/header/bell.svg";

interface HeaderProps {
  title: string;
  onClickHamburger: () => void;
  onClickBell: () => void;
}
export default function Header({
  title,
  onClickHamburger,
  onClickBell,
}: HeaderProps) {
  return (
    <header className="bg-white py-4 px-5 border-b border-gray-200 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onClickHamburger}>
          <Image
            src="/icons/header/hamburger.svg"
            alt="hamburger"
            width={24}
            height={24}
          />
        </button>
        <h1 className="text-base font-semibold text-gray-700">
          {title}님의 대시보드
        </h1>
      </div>
      <button type="button" onClick={onClickBell}>
        <Bell className="w-4 h-4 text-gray-400" />
      </button>
    </header>
  );
}
