"use client";

import { addMonths, format, subMonths } from "date-fns";
import { ko } from "date-fns/locale";
import { AnimatePresence, m } from "motion/react";
import DoubleArrow from "@/public/icons/sidemenu/double_arrow.svg";
import GoalFilter from "@/components/common/GoalFilter";

interface CalendarNavProps {
  month: Date;
  onMonthChange: (month: Date) => void;
  goalId: number | undefined;
  onGoalIdChange: (goalId: number | undefined) => void;
}

export default function CalendarNav({
  month,
  onMonthChange,
  goalId,
  onGoalIdChange,
}: CalendarNavProps) {
  return (
    <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
      <div className="flex shrink-0 items-center gap-4">
        <button
          type="button"
          aria-label="이전 달"
          onClick={() => onMonthChange(subMonths(month, 1))}
        >
          <DoubleArrow className="size-6 rotate-180 text-gray-400 dark:text-muted-foreground" />
        </button>
        <AnimatePresence mode="wait">
          <m.span
            key={format(month, "yyyy-MM")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-lg font-semibold whitespace-nowrap text-gray-800 dark:text-foreground"
          >
            {format(month, "yyyy년 M월", { locale: ko })}
          </m.span>
        </AnimatePresence>
        <button
          type="button"
          aria-label="다음 달"
          onClick={() => onMonthChange(addMonths(month, 1))}
        >
          <DoubleArrow className="size-6 text-gray-400 dark:text-muted-foreground" />
        </button>
      </div>
      <GoalFilter
        goalId={goalId}
        onGoalIdChange={onGoalIdChange}
        className="lg:w-[350px]"
      />
    </div>
  );
}
