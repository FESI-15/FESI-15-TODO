import type { GetTeamIdPostsParams } from "@/apis/model";
import { getTeamIdPosts, getTeamIdPostsPostId } from "@/apis/posts/posts";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { postsKeys } from "./posts.key";

export const getPostsQueryOptionsServer = (params?: GetTeamIdPostsParams) => ({
  queryKey: postsKeys.list(params),
  queryFn: async ({ signal }: { signal: AbortSignal }) => {
    const headers = await getAuthorizationHeaders();

    if (!headers) {
      throw new Error("Authentication is required.");
    }

    const response = await getTeamIdPosts(params, { headers }, signal);

    return { data: response.data };
  },
});

export const getPostsInfiniteQueryOptionsServer = (
  params?: GetTeamIdPostsParams,
) => ({
  queryKey: postsKeys.list(params),
  queryFn: async ({
    pageParam,
    signal,
  }: {
    pageParam: string | null;
    signal: AbortSignal;
  }) => {
    const headers = await getAuthorizationHeaders();

    if (!headers) {
      throw new Error("Authentication is required.");
    }

    const response = await getTeamIdPosts(
      {
        ...params,
        cursor: pageParam ?? undefined,
      },
      { headers },
      signal,
    );

    return { data: response.data };
  },
  initialPageParam: null as string | null,
  getNextPageParam: (lastPage: {
    data: Awaited<ReturnType<typeof getTeamIdPosts>>["data"];
  }) => lastPage.data.nextCursor ?? undefined,
});

export const getPostQueryOptionsServer = (postId: number) => ({
  queryKey: postsKeys.detail(postId),
  queryFn: async ({ signal }: { signal: AbortSignal }) => {
    const headers = await getAuthorizationHeaders();

    if (!headers) {
      throw new Error("Authentication is required.");
    }

    const response = await getTeamIdPostsPostId(postId, { headers }, signal);

    return { data: response.data };
  },
  enabled: !!postId,
});
