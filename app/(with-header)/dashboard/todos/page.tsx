import type { GetTeamIdTodosParams } from "@/apis/model";
import { getTodosQueryOptionsServer } from "@/hooks/queries/todos/todos.server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Todos from "@/components/todos/Todos";
import { TODOS_LIMIT } from "@/constants/pagination";

interface TodosPageProps {
  searchParams: Promise<{
    done?: string;
  }>;
}

export default async function TodosPage({ searchParams }: TodosPageProps) {
  const queryClient = new QueryClient();
  const { done } = await searchParams;

  const params: GetTeamIdTodosParams | undefined =
    done === "true" || done === "false"
      ? { done, limit: TODOS_LIMIT }
      : { done: undefined, limit: TODOS_LIMIT };

  try {
    await queryClient.fetchQuery(getTodosQueryOptionsServer(params));
  } catch (error) {
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Todos />
    </HydrationBoundary>
  );
}
