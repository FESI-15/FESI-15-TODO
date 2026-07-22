import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Dashboard from "@/components/dashboard/Dashboard";
import { getGoalsQueryOptionsServer } from "@/hooks/queries/goals/goals.server";

export default async function DashboardPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getGoalsQueryOptionsServer());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}
