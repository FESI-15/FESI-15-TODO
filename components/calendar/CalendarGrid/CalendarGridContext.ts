import { createContext, useContext } from "react";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";

export interface CalendarGridContextValue {
  todosByDate: Record<string, GetTeamIdTodos200TodosItem[]>;
  selectedDate: Date;
  onSelectedDateChange: (date: Date) => void;
}

export const CalendarGridContext =
  createContext<CalendarGridContextValue | null>(null);

export const useCalendarGridContext = () => {
  const context = useContext(CalendarGridContext);

  if (!context) {
    throw new Error(
      "CalendarGridContext는 CalendarGrid 내부에서만 사용할 수 있습니다.",
    );
  }

  return context;
};
