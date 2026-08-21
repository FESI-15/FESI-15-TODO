import { SIDE_MENU_LIST } from "@/constants/sidemenuList";
import { usePathname } from "next/navigation";
import GoalsMenu from "./GoalsMenu/GoalsMenu";
import SideMenuListItem from "./SideMenuListItem/SideMenuListItem";

export default function SideMenuList({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const isActivePath = (href: string) => pathname.startsWith(href);

  return (
    <ul className="flex flex-col gap-3">
      {SIDE_MENU_LIST.map((item) =>
        item.name !== "목표" ? (
          <SideMenuListItem
            key={item.name}
            item={item}
            isActivePath={isActivePath}
            onClose={onClose}
          />
        ) : (
          <GoalsMenu
            key={item.name}
            item={item}
            isActivePath={isActivePath}
            onClose={onClose}
          />
        ),
      )}
    </ul>
  );
}
