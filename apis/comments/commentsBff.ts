import type {
  GetTeamIdPostsPostIdComments200,
  GetTeamIdPostsPostIdCommentsParams,
  PatchTeamIdPostsPostIdCommentsCommentId200,
  PatchTeamIdPostsPostIdCommentsCommentIdBody,
  PostTeamIdPostsPostIdComments201,
  PostTeamIdPostsPostIdCommentsBody,
  PostTeamIdPostsPostIdCommentsCommentIdLikes200,
} from "@/apis/model";

import { bffInstance } from "@/apis/bffAxiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export interface PostCommentsVariables {
  postId: number;
  data: PostTeamIdPostsPostIdCommentsBody;
}

export interface CommentIdVariables {
  postId: number;
  commentId: number;
}

export interface PatchCommentVariables extends CommentIdVariables {
  data: PatchTeamIdPostsPostIdCommentsCommentIdBody;
}

export const getComments = (
  postId: number,
  params?: GetTeamIdPostsPostIdCommentsParams,
  options?: SecondParameter<typeof bffInstance>,
  signal?: AbortSignal,
) => {
  return bffInstance<GetTeamIdPostsPostIdComments200>(
    {
      url: `/api/posts/${postId}/comments`,
      method: "GET",
      params,
      signal,
    },
    options,
  );
};

export const postComments = (
  { postId, data }: PostCommentsVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PostTeamIdPostsPostIdComments201>(
    {
      url: `/api/posts/${postId}/comments`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};

export const patchComment = (
  { postId, commentId, data }: PatchCommentVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PatchTeamIdPostsPostIdCommentsCommentId200>(
    {
      url: `/api/posts/${postId}/comments/${commentId}`,
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};

export const deleteComment = (
  { postId, commentId }: CommentIdVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<void>(
    {
      url: `/api/posts/${postId}/comments/${commentId}`,
      method: "DELETE",
    },
    options,
  );
};

export const postCommentLike = (
  { postId, commentId }: CommentIdVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PostTeamIdPostsPostIdCommentsCommentIdLikes200>(
    {
      url: `/api/posts/${postId}/comments/${commentId}/likes`,
      method: "POST",
    },
    options,
  );
};

export const deleteCommentLike = (
  { postId, commentId }: CommentIdVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PostTeamIdPostsPostIdCommentsCommentIdLikes200>(
    {
      url: `/api/posts/${postId}/comments/${commentId}/likes`,
      method: "DELETE",
    },
    options,
  );
};
