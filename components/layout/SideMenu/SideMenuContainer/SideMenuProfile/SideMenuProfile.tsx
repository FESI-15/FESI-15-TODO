import Image from "next/image";
import Link from "next/link";

interface SideMenuProfileProps {
  name: string;
  email: string;
  image: string | null;
}

export default function SideMenuProfile({
  name,
  email,
  image,
}: SideMenuProfileProps) {
  return (
    <Link
      href="/profile"
      className="flex items-center gap-2 p-2 border border-gray-200 rounded-full flex-1"
    >
      <div className="w-[38px] h-[38px] rounded-full bg-gray-200">
        <Image
          src={image || "/images/sidemenu/profile.png"}
          alt="profile"
          width={38}
          height={38}
          className="object-cover"
        />
      </div>
      <div>
        <div className="flex items-center gap-1">
          <p className="text-gray-700 text-sm font-medium">{name}</p>
          <Image
            src="/icons/common/chevron-right.svg"
            alt="chevron-right"
            width={16}
            height={16}
          />
        </div>
        <p className="text-sm text-[#a0a0a0]">{email}</p>
      </div>
    </Link>
  );
}
