import type { GetTeamIdPosts200, GetTeamIdPostsParams } from "@/apis/model";
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
  queryFn: async ({ pageParam }: { pageParam: string | null }) => {
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
    );

    return { data: response.data };
  },
  initialPageParam: null,
  getNextPageParam: (lastPage: GetTeamIdPosts200) => lastPage.nextCursor,
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
