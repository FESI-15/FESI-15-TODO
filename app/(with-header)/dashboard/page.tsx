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

  try {
    await Promise.all([
      queryClient.fetchQuery(getTodosQueryOptionsServer()),
      queryClient.fetchQuery(getGoalsQueryOptionsServer()),
      queryClient.fetchQuery(getUserMeQueryOptionsServer()),
    ]);

    const goals = queryClient.getQueryData<
      Awaited<
        ReturnType<ReturnType<typeof getGoalsQueryOptionsServer>["queryFn"]>
      >
    >(getGoalsQueryOptionsServer().queryKey);

    if (goals) {
      await Promise.all(
        goals.data.goals.map((goal) =>
          queryClient.fetchQuery(
            getTodosQueryOptionsServer({ goalId: goal.id }),
          ),
        ),
      );
    }
  } catch (error) {
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}
