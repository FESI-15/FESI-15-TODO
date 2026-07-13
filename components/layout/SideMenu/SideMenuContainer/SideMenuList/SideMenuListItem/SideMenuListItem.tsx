import { SideMenuListProps } from "@/constants/sidemenuList";
import Link from "next/link";
import {
  sideMenuListIconVariants,
  sideMenuListTextVariants,
  type SideMenuListIconVariantProps,
  type SideMenuListTextVariantProps,
} from "../sideMenuListVariants";

type SideMenuListItemProps = {
  item: SideMenuListProps;
  isActivePath: (href: string) => boolean;
} & SideMenuListTextVariantProps &
  SideMenuListIconVariantProps;

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
