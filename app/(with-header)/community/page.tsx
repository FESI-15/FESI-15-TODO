import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import {
  getPostsInfiniteQueryOptionsServer,
  getPostsQueryOptionsServer,
} from "@/hooks/queries/posts/posts.server";
import { Community } from "@/components/community/Community";
import {
  COMMUNITY_BEST_LIMIT,
  COMMUNITY_LIMIT,
} from "@/constants/CommunityLimit";
import { Skeleton } from "@/components/ui/skeleton";

interface CommunityPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function CommunityPage({
  searchParams,
}: CommunityPageProps) {
  const { search } = await searchParams;
  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.fetchInfiniteQuery(
        getPostsInfiniteQueryOptionsServer({
          search: search ?? "",
          limit: COMMUNITY_LIMIT,
        }),
      ),
      queryClient.fetchQuery(
        getPostsQueryOptionsServer({
          type: "best",
          limit: COMMUNITY_BEST_LIMIT,
        }),
      ),
    ]);
  } catch (error) {
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <Community />
        <div className="py-6">
          <Skeleton className="w-full h-[800px]" />
        </div>
      </Suspense>
    </HydrationBoundary>
  );
}
