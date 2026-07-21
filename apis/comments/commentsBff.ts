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

// 댓글 목록 조회
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

// 댓글 생성
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

// 댓글 수정
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

// 댓글 삭제
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

// 댓글 좋아요 추가
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

// 댓글 좋아요 삭제
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
