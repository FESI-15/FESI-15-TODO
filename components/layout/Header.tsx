import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [test, setTest] = useState(1);
  const handleTest = () => {
    setTest(test + "0");
  };
  return (
    <header className="bg-white py-4 px-5 border-b border-gray-200 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">
        <button type="button">
          <Image
            src="/icons/header/hamburger.svg"
            alt="hamburger"
            width={24}
            height={24}
          />
        </button>
        <h1 className="text-base font-semibold text-gray-700">
          체다치즈님의 대시보드
        </h1>
      </div>
      <button type="button"></button>
    </header>
  );
}
