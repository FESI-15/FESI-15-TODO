import Goals from "@/components/goals/Goals";
import { getGoalQueryOptionsServer } from "@/hooks/queries/goals/goals.server";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import { getUserMeQueryOptionsServer } from "@/hooks/queries/users/users.server";
import { getTodosQueryOptionsServer } from "@/hooks/queries/todos/todos.server";
import { TODOS_LIMIT } from "@/constants/pagination";

export default async function GoalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.fetchQuery(getUserMeQueryOptionsServer()),
      queryClient.fetchQuery(
        getTodosQueryOptionsServer({ goalId: Number(id), limit: TODOS_LIMIT }),
      ),
      queryClient.fetchQuery(getGoalQueryOptionsServer(Number(id))),
    ]);
  } catch (error) {
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Goals goalId={Number(id)} />
    </HydrationBoundary>
  );
}
