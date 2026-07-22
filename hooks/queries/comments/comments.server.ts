import type { GetTeamIdPostsPostIdCommentsParams } from "@/apis/model";
import { getTeamIdPostsPostIdComments } from "@/apis/comments/comments";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { commentsKeys } from "./comments.key";

export const getCommentsQueryOptionsServer = (
  postId: number,
  params?: GetTeamIdPostsPostIdCommentsParams,
) => ({
  queryKey: commentsKeys.list(postId, params),
  queryFn: async ({ signal }: { signal: AbortSignal }) => {
    const headers = await getAuthorizationHeaders();

    if (!headers) {
      throw new Error("Authentication is required.");
    }

    const response = await getTeamIdPostsPostIdComments(
      postId,
      params,
      { headers },
      signal,
    );

    return { data: response.data };
  },
  enabled: !!postId,
});
