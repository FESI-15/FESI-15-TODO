import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
} from "date-fns";
import type { GetTeamIdTodos200TodosItem } from "@/apis/model";

export const CALENDAR_WEEK_STARTS_ON = 1;

export const getCalendarGridRange = (month: Date) => {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);

  return {
    start: startOfWeek(monthStart, { weekStartsOn: CALENDAR_WEEK_STARTS_ON }),
    end: endOfWeek(monthEnd, { weekStartsOn: CALENDAR_WEEK_STARTS_ON }),
  };
};

export const groupTodosByDate = (todos: GetTeamIdTodos200TodosItem[]) => {
  const result: Record<string, GetTeamIdTodos200TodosItem[]> = {};

  for (const todo of todos) {
    if (!todo.dueDate) {
      continue;
    }

    const dateKey = format(new Date(todo.dueDate), "yyyy-MM-dd");
    (result[dateKey] ??= []).push(todo);
  }

  return result;
};
