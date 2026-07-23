import Dashboard from "@/components/dashboard/Dashboard";
import { getGoalsQueryOptionsServer } from "@/hooks/queries/goals/goals.server";
import { getTodosQueryOptionsServer } from "@/hooks/queries/todos/todos.server";
import { getUserMeQueryOptionsServer } from "@/hooks/queries/users/users.server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getTodosQueryOptionsServer()),
    queryClient.prefetchQuery(getGoalsQueryOptionsServer()),
    queryClient.prefetchQuery(getUserMeQueryOptionsServer()),
  ]);

  const goals = queryClient.getQueryData<
    Awaited<
      ReturnType<ReturnType<typeof getGoalsQueryOptionsServer>["queryFn"]>
    >
  >(getGoalsQueryOptionsServer().queryKey);

  if (goals) {
    await Promise.all(
      goals.data.goals.map((goal) =>
        queryClient.prefetchQuery(
          getTodosQueryOptionsServer({ goalId: goal.id }),
        ),
      ),
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}
