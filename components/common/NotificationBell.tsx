import Bell from "@/public/icons/header/bell.svg";
interface NotificationBellProps {
  onClickBell: () => void;
  newNotification: boolean;
}
export default function NotificationBell({
  onClickBell,
  newNotification,
}: NotificationBellProps) {
  return (
    <button className="relative" type="button" onClick={onClickBell}>
      {newNotification && (
        <span className="absolute top-0 right-0.5 w-2 h-2 bg-orange-500 rounded-full" />
      )}
      <Bell className="text-gray-400" width={24} height={24} />
    </button>
  );
}
