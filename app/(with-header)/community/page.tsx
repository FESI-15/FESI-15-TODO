import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPostsQueryOptionsServer } from "@/hooks/queries/posts/posts.server";
import { Community } from "@/components/community/Community";

export default async function CommunityPage() {
  const queryClient = new QueryClient();

  await Promise.all([queryClient.prefetchQuery(getPostsQueryOptionsServer())]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Community />
    </HydrationBoundary>
  );
}
