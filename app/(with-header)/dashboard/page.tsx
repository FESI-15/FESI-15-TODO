import Dashboard from "@/components/dashboard/Dashboard";
import { Skeleton } from "@/components/ui/skeleton";
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
      {/* <div className="mt-8 px-4">
        <div className="w-full flex justify-between items-center">
          <Skeleton className="w-[141px] h-[32px]" />
          <Skeleton className="w-[71px] h-[20px]" />
        </div>
        <div>
          <Skeleton className="w-full h-[186px] mt-2.5" />
        </div>

        <div className="mt-10">
          <Skeleton className="w-[115px] h-[32px]" />
          <Skeleton className="w-full h-[186px] mt-2.5" />
        </div>

        <div className="mt-10">
          <Skeleton className="w-[123px] h-[40px]" />
          <Skeleton className="w-full h-[500px] mt-3" />
        </div>
      </div> */}
    </HydrationBoundary>
  );
}
