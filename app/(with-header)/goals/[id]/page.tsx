import Goals from "@/components/goals/Goals";
import { getGoalQueryOptionsServer } from "@/hooks/queries/goals/goals.server";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import { getUserMeQueryOptionsServer } from "@/hooks/queries/users/users.server";

export default async function GoalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getGoalQueryOptionsServer(Number(id))),
    queryClient.prefetchQuery(getUserMeQueryOptionsServer()),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Goals goalId={Number(id)} />
    </HydrationBoundary>
  );
}
