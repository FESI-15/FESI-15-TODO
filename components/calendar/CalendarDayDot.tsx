import { cn } from "@/utils/cn";

interface CalendarDayDotProps {
  done: boolean;
}

export default function CalendarDayDot({ done }: CalendarDayDotProps) {
  return (
    <span
      className={cn(
        "size-1.5 rounded-full",
        done ? "bg-gray-300" : "bg-orange-500",
      )}
    />
  );
}
