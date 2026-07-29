import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const TABS = [
  {
    label: "all",
    value: "",
  },
  {
    label: "to do",
    value: "?done=false",
  },
  {
    label: "done",
    value: "?done=true",
  },
];

const TodosTabVariants = cva(
  "font-bold text-gray-400 py-2 px-4 rounded-[12px]",
  {
    variants: {
      isActive: {
        true: "text-orange-600 bg-orange-alpha-20",
      },
    },
  },
);

export default function TodosTab() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUrl = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;
  return (
    <div>
      {TABS.map((tab) => (
        <Link
          className={TodosTabVariants({
            isActive: currentUrl === `/dashboard/todos${tab.value}`,
          })}
          key={tab.value}
          href={`/dashboard/todos${tab.value}`}
        >
          {tab.label.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
