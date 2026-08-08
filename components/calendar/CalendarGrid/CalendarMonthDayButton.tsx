import { cva } from "class-variance-authority";
import { isToday } from "date-fns";
import type { DayButtonProps } from "react-day-picker";
import { cn } from "@/utils/cn";

const calendarDayButtonVariants = cva(
  "flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-medium",
  {
    variants: {
      state: {
        today: "bg-orange-500 text-white",
        outside: "text-gray-300 dark:text-muted-foreground/40",
        default: "text-gray-800 dark:text-foreground",
      },
    },
  },
);

export default function CalendarMonthDayButton({
  day,
  className,
  ...buttonProps
}: DayButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        calendarDayButtonVariants({
          state: isToday(day.date)
            ? "today"
            : day.outside
              ? "outside"
              : "default",
        }),
        className,
      )}
      {...buttonProps}
    />
  );
}
