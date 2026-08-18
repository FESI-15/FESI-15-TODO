import { getGoalsQueryOptionsServer } from "@/hooks/queries/goals/goals.server";
import { getTodosQueryOptionsServer } from "@/hooks/queries/todos/todos.server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Dashboard from "@/components/dashboard/Dashboard";
import { TODOS_LIMIT } from "@/constants/pagination";
import FirstVisit from "@/components/dashboard/FirstVisit/FirstVisit";

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.fetchQuery(
        getTodosQueryOptionsServer({ limit: TODOS_LIMIT }),
      ),
      queryClient.fetchQuery(getGoalsQueryOptionsServer()),
    ]);
  } catch (error) {
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FirstVisit />
      <Dashboard />
    </HydrationBoundary>
  );
}
