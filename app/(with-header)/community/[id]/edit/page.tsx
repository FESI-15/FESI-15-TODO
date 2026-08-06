import { HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@/utils/getQueryClient";
import { getPostQueryOptionsServer } from "@/hooks/queries/posts/posts.server";
import { dehydrate } from "@tanstack/react-query";
import { CommunityEdit } from "@/components/community/CommunityEdit/CommunityEdit";

interface CommunityEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function CommunityEditPage({
  params,
}: CommunityEditPageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery(getPostQueryOptionsServer(Number(id)));
  } catch {
    throw new Error();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CommunityEdit id={Number(id)} />
    </HydrationBoundary>
  );
}
