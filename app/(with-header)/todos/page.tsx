import { getTodosQueryOptionsServer } from "@/hooks/queries/todos/todos.server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Todos from "@/components/todos/Todos";

export default async function TodosPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getTodosQueryOptionsServer());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Todos />
    </HydrationBoundary>
  );
}
