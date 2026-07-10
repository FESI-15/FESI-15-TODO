import Link from "next/link";
import { SIDE_MENU_LIST } from "@/constants/sidemenuList";
import { usePathname } from "next/navigation";
import { cva } from "class-variance-authority";

const sideMenuListTextVariants = cva(
  "flex items-center gap-2 py-3.5 px-4 rounded-[20px] text-gray-700",
  {
    variants: {
      isActive: {
        true: "bg-orange-200 text-orange-700",
      },
    },
  },
);

const sideMenuListIconVariants = cva("w-6 h-6 text-gray-300", {
  variants: {
    isActive: {
      true: "text-orange-600",
    },
  },
});

export default function SideMenuList() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <ul className="flex flex-col gap-3">
      {SIDE_MENU_LIST.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className={sideMenuListTextVariants({
              isActive: isActive(item.href),
            })}
          >
            <item.icon
              className={sideMenuListIconVariants({
                isActive: isActive(item.href),
              })}
            />
            <span className="text-lg font-semibold">{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
