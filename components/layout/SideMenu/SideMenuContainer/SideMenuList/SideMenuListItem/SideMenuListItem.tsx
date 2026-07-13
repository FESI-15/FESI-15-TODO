import { SideMenuListProps } from "@/constants/sidemenuList";
import Link from "next/link";
import {
  sideMenuListIconVariants,
  sideMenuListTextVariants,
} from "../sideMenuListVariants";
import { VariantProps } from "class-variance-authority";

interface SideMenuListItemProps
  extends
    VariantProps<typeof sideMenuListTextVariants>,
    VariantProps<typeof sideMenuListIconVariants> {
  item: SideMenuListProps;
  isActivePath: (href: string) => boolean;
}
export default function SideMenuListItem({
  item,
  isActivePath,
}: SideMenuListItemProps) {
  const isActive = isActivePath(item.href);

  return (
    <Link
      href={item.href}
      className={sideMenuListTextVariants({
        isActive,
      })}
    >
      <div className="flex items-center gap-2">
        <item.icon
          className={sideMenuListIconVariants({
            isActive,
          })}
        />
        <span className="text-lg">{item.name}</span>
      </div>
    </Link>
  );
}
