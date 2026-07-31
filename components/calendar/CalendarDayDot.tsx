import { cva } from "class-variance-authority";

const calendarDayDotVariants = cva("size-1.5 rounded-full", {
  variants: {
    done: {
      true: "bg-gray-300",
      false: "bg-orange-500",
    },
  },
});

interface CalendarDayDotProps {
  done: boolean;
}

export default function CalendarDayDot({ done }: CalendarDayDotProps) {
  return <span className={calendarDayDotVariants({ done })} />;
}
