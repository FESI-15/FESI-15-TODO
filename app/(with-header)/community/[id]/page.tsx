import { CommunityDetail } from "@/components/community/CommunityDetail/CommunityDetail";
import { Skeleton } from "@/components/ui/skeleton";
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
      {/* <CommunityDetail id={Number(id)} /> */}
      <div className="p-4">
        <div className="w-full bg-white rounded-[24px] py-6 px-4 max-w-[768px] mx-auto">
          <div className="flex flex-col gap-6">
            <Skeleton className="w-[200px] h-6 " />
            <Skeleton className="w-[66px] h-5 " />
          </div>
          <div className="mt-10">
            <div className="flex flex-col gap-2">
              <Skeleton className="w-[300px] h-6 " />
              <Skeleton className="w-[250px] h-6 " />
              <Skeleton className="w-[200px] h-6 " />
            </div>
            <div className="mt-6">
              <Skeleton className="size-[150px] " />
            </div>
            <Skeleton className="w-[114px] h-4 mt-4 " />
          </div>
          <div className="mt-10">
            <Skeleton className="w-10 h-6 " />
            <div className="flex gap-3 mt-4 justify-between">
              <Skeleton className="w-full h-11 " />
              <Skeleton className="w-16 h-10 " />
            </div>
            <div className="mt-6 flex flex-col gap-8">
              <div>
                <Skeleton className="w-[56px] h-5 " />
                <div className="mt-3">
                  <Skeleton className="w-[250px] h-5 " />
                  <Skeleton className="w-[200px] h-5 mt-1 " />
                  <Skeleton className="w-[62px] h-4 mt-2 " />
                </div>
              </div>
              <div>
                <Skeleton className="w-[56px] h-5 " />
                <div className="mt-3">
                  <Skeleton className="w-[250px] h-5 " />
                  <Skeleton className="w-[200px] h-5 mt-1 " />
                  <Skeleton className="w-[62px] h-4 mt-2 " />
                </div>
              </div>
              <div>
                <Skeleton className="w-[56px] h-5 " />
                <div className="mt-3">
                  <Skeleton className="w-[250px] h-5 " />
                  <Skeleton className="w-[200px] h-5 mt-1 " />
                  <Skeleton className="w-[62px] h-4 mt-2 " />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
