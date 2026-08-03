import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { getPostsQueryOptionsServer } from "@/hooks/queries/posts/posts.server";
import { Community } from "@/components/community/Community";

interface CommunityPageProps {
  searchParams: {
    search: string;
  };
}

export default async function CommunityPage({
  searchParams,
}: CommunityPageProps) {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getPostsQueryOptionsServer({ search: searchParams.search ?? "" }),
    ),
    queryClient.prefetchQuery(
      getPostsQueryOptionsServer({ type: "best", limit: 6 }),
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <Community />
      </Suspense>
    </HydrationBoundary>
  );
}
