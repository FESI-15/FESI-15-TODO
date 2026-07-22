import Dashboard from "@/components/dashboard/Dashboard";
import { getGoalsQueryOptionsServer } from "@/hooks/queries/goals/goals.server";
import { getTodosQueryOptionsServer } from "@/hooks/queries/todos/todo.server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  const todos = await queryClient.fetchQuery(getTodosQueryOptionsServer());
  const goals = await queryClient.fetchQuery(getGoalsQueryOptionsServer());

  if (!todos || !goals) notFound();

  await Promise.all(
    goals.data.goals.map((goal) =>
      queryClient.prefetchQuery(
        getTodosQueryOptionsServer({ goalId: goal.id }),
      ),
    ),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}
