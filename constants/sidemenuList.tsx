import Dashboard from "@/public/icons/sidemenu/dashboard.svg";
import Goals from "@/public/icons/sidemenu/goals.svg";
import Calendar from "@/public/icons/sidemenu/calendar.svg";
import Community from "@/public/icons/sidemenu/community.svg";
import Favorites from "@/public/icons/sidemenu/favorites.svg";

export interface SideMenuListProps {
  name: string;
  href: string;
  icon: React.ElementType;
}

export const SIDE_MENU_LIST: SideMenuListProps[] = [
  {
    name: "대시보드",
    href: "/dashboard",
    icon: Dashboard,
  },
  {
    name: "목표",
    href: "/goals",
    icon: Goals,
  },
  {
    name: "캘린더",
    href: "/calendar",
    icon: Calendar,
  },
  {
    name: "소통 게시판",
    href: "/community",
    icon: Community,
  },
  {
    name: "찜한 할 일",
    href: "/favorites",
    icon: Favorites,
  },
];
