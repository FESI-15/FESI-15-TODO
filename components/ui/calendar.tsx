"use client";

import * as React from "react";
import { DayPicker, type DayButton } from "react-day-picker";
import { cn } from "@/utils/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ko } from "date-fns/locale";

function Calendar({
  classNames,
  showOutsideDays = true,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2 [--cell-size:--spacing(7)]")}
      locale={ko}
      classNames={{
        root: "w-fit",
        months: "relative flex flex-col gap-4 md:flex-row",
        month: "flex w-full flex-col gap-4",
        nav: "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
        button_previous:
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
        month_caption:
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
        caption_label: "font-semibold",
        weekdays: "flex",
        weekday: "flex-1 font-medium",
        week: "mt-2 flex w-full",
        day: "[&>button]:rounded-full",
        today: "[&>button]:rounded-full",
        outside: "text-muted-foreground aria-selected:text-muted-foreground",
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left")
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            );
          else
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            );
        },
        DayButton: ({ ...props }) => <CalendarDayButton {...props} />,
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  return (
    <Button
      variant="ghost"
      size="icon"
      data-selected-single={modifiers.selected}
      className={cn(
        "relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70",
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
