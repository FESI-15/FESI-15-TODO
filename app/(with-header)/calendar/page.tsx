import { format } from "date-fns";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Calendar from "@/components/calendar/Calendar";
import { getCalendarGridRange } from "@/components/calendar/calendarGrid.utils";
import { getTodosQueryOptionsServer } from "@/hooks/queries/todos/todos.server";
import { getGoalsQueryOptionsServer } from "@/hooks/queries/goals/goals.server";
import { getUserMeQueryOptionsServer } from "@/hooks/queries/users/users.server";

export default async function CalendarPage() {
  const queryClient = new QueryClient();
  const { start, end } = getCalendarGridRange(new Date());

  try {
    await Promise.all([
      queryClient.fetchQuery(
        getTodosQueryOptionsServer({
          from: format(start, "yyyy-MM-dd"),
          to: format(end, "yyyy-MM-dd"),
          limit: 100,
        }),
      ),
      queryClient.fetchQuery(getGoalsQueryOptionsServer()),
      queryClient.fetchQuery(getUserMeQueryOptionsServer()),
    ]);
  } catch {
    throw new Error();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Calendar />
    </HydrationBoundary>
  );
}
