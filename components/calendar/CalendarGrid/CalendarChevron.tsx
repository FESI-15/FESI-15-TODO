import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { ChevronProps } from "react-day-picker";
import { cn } from "@/utils/cn";

export default function CalendarChevron({
  orientation,
  className,
  ...chevronProps
}: ChevronProps) {
  const Icon = orientation === "left" ? ChevronLeftIcon : ChevronRightIcon;

  return <Icon className={cn("size-4", className)} {...chevronProps} />;
}
