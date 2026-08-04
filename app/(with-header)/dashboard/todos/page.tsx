import type { GetTeamIdTodosParams } from "@/apis/model";
import { getTodosQueryOptionsServer } from "@/hooks/queries/todos/todos.server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Todos from "@/components/todos/Todos";
import { notFound } from "next/navigation";

interface TodosPageProps {
  searchParams: Promise<{
    done?: string;
  }>;
}

export default async function TodosPage({ searchParams }: TodosPageProps) {
  const queryClient = new QueryClient();
  const { done } = await searchParams;

  const params: GetTeamIdTodosParams | undefined =
    done === "true" || done === "false" ? { done } : { done: undefined };

  try {
    await queryClient.fetchQuery(getTodosQueryOptionsServer(params));
  } catch {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Todos />
    </HydrationBoundary>
  );
}
