import { CommunityDetail } from "@/components/community/CommunityDetail/CommunityDetail";
import { getCommentsQueryOptionsServer } from "@/hooks/queries/comments/comments.server";
import { getPostQueryOptionsServer } from "@/hooks/queries/posts/posts.server";
import { getQueryClient } from "@/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export default async function CommunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery(getPostQueryOptionsServer(Number(id)));
    await queryClient.fetchQuery(getCommentsQueryOptionsServer(Number(id)));
  } catch {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CommunityDetail id={Number(id)} />
    </HydrationBoundary>
  );
}
