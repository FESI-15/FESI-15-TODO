import { useGetUserMe } from "@/hooks/queries/users/users.bff.hook";
import Image from "next/image";
import Link from "next/link";

export default function SideMenuProfile({ onClose }: { onClose?: () => void }) {
  const { data: user } = useGetUserMe();
  return (
    <Link
      href="/mypage"
      className="flex items-center gap-2 p-2 border border-gray-200 dark:border-border rounded-full flex-1"
      onClick={onClose}
    >
      <div className="w-[38px] h-[38px] rounded-full bg-gray-200 dark:bg-muted overflow-hidden">
        <Image
          src={user?.data.image || "/images/sidemenu/profile.png"}
          alt="profile"
          width={38}
          height={38}
          className="object-cover rounded-full"
        />
      </div>
      <div>
        <div className="flex items-center gap-1">
          <p className="text-gray-700 dark:text-foreground text-sm font-medium">
            {user?.data.name}
          </p>
          <Image
            src="/icons/common/chevron-right.svg"
            alt="chevron-right"
            width={16}
            height={16}
          />
        </div>
        <p className="text-sm text-[#a0a0a0] dark:text-muted-foreground">
          {user?.data.email}
        </p>
      </div>
    </Link>
  );
}
