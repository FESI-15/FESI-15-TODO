import { cva } from "class-variance-authority";

export type FavoritesTabValue = "all" | "todo" | "done";

const TABS: { label: string; value: FavoritesTabValue }[] = [
  { label: "all", value: "all" },
  { label: "to do", value: "todo" },
  { label: "done", value: "done" },
];

const FavoritesTabVariants = cva(
  "font-bold text-gray-400 dark:text-muted-foreground py-2 px-4 rounded-[12px]",
  {
    variants: {
      isActive: {
        true: "text-orange-600 bg-orange-alpha-20",
      },
    },
  },
);

interface FavoritesTabProps {
  value: FavoritesTabValue;
  onChange: (value: FavoritesTabValue) => void;
}

export default function FavoritesTab({ value, onChange }: FavoritesTabProps) {
  return (
    <div>
      {TABS.map((tab) => (
        <button
          type="button"
          key={tab.value}
          className={FavoritesTabVariants({ isActive: value === tab.value })}
          onClick={() => onChange(tab.value)}
        >
          {tab.label.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
