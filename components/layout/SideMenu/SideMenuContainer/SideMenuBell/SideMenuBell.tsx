import Bell from "@/public/icons/header/bell.svg";

interface SideMenuBellProps {
  newNotification: boolean;
  onClickBell: () => void;
}
export default function SideMenuBell({
  newNotification,
  onClickBell,
}: SideMenuBellProps) {
  return (
    <button
      className="relative p-4 border border-gray-200 rounded-full hidden md:block"
      type="button"
      onClick={onClickBell}
    >
      {newNotification && (
        <span className="absolute top-0 right-1 w-3 h-3 bg-orange-500 rounded-full" />
      )}
      <Bell className="text-gray-500" width={24} height={24} />
    </button>
  );
}
