import { getGoals } from "@/apis/goals/goalsBff";
import { getTodos } from "@/apis/todos/todosBff";
import Dashboard from "@/components/dashboard/Dashboard";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["/api/todos"],
    queryFn: () => getTodos(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["/api/goals"],
    queryFn: () => getGoals(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}
