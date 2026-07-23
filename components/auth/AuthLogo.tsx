import Image from "next/image";

export function AuthLogo() {
  return (
    <div className="flex items-center gap-4 px-2">
      <Image
        src="/icons/sidemenu/symbol.svg"
        alt="symbol"
        width={48}
        height={48}
      />
      <Image
        src="/icons/sidemenu/Slid to-do.svg"
        alt="Slid to-do"
        width={140}
        height={24}
      />
    </div>
  );
}
