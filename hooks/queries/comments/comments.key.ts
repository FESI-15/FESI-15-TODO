import type { GetTeamIdPostsPostIdCommentsParams } from "@/apis/model";

export const commentsKeys = {
  list: (postId: number, params?: GetTeamIdPostsPostIdCommentsParams) =>
    [`/api/posts/${postId}/comments`, params] as const,
};
