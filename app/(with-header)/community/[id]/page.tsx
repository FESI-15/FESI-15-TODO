import { CommunityDetail } from "@/components/community/CommunityDetail/CommunityDetail";
import { getCommentsQueryOptionsServer } from "@/hooks/queries/comments/comments.server";
import { getPostQueryOptionsServer } from "@/hooks/queries/posts/posts.server";
import { getQueryClient } from "@/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface CommunityDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CommunityDetailPage({
  params,
}: CommunityDetailPageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery(getPostQueryOptionsServer(Number(id)));
    await queryClient.fetchQuery(getCommentsQueryOptionsServer(Number(id)));
  } catch (error) {
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CommunityDetail id={Number(id)} />
    </HydrationBoundary>
  );
}
