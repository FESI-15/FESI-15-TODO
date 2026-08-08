import HamburgerIcon from "@/public/icons/header/hamburger.svg";
import NotificationBell from "@/components/common/NotificationBell";
import useHeaderStore from "@/store/useHeaderStore";

interface HeaderProps {
  onClickHamburger: () => void;
}
export default function Header({ onClickHamburger }: HeaderProps) {
  const title = useHeaderStore((s) => s.title);

  return (
    <header className="bg-white dark:bg-sidebar py-4 px-5 border-b border-gray-200 dark:border-border flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onClickHamburger}>
          <HamburgerIcon className="size-6 text-gray-500 dark:text-muted-foreground" />
        </button>
        <h1 className="text-base font-semibold text-gray-700 dark:text-foreground">
          {title}
        </h1>
      </div>
      <NotificationBell />
    </header>
  );
}
