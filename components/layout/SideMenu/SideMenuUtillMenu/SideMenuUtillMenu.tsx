import Image from "next/image";
export default function SideMenuUtillMenu() {
  return (
    <ul className="mt-6">
      <li>
        <button
          type="button"
          className="flex items-center gap-2.5 text-gray-500 px-4 py-3.5 w-full"
        >
          <Image
            src="/icons/sidemenu/settings.svg"
            alt="settings"
            width={24}
            height={24}
          />
          <span className="font-semibold text-lg">설정</span>
        </button>
      </li>
      <li>
        <button
          type="button"
          className="flex items-center gap-2.5 text-gray-500 px-4 py-3.5 w-full"
        >
          <Image
            src="/icons/sidemenu/logout.svg"
            alt="logout"
            width={24}
            height={24}
          />
          <span className="font-semibold text-lg">로그아웃</span>
        </button>
      </li>
    </ul>
  );
}
