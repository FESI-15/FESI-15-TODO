import { useMutation, useQuery } from "@tanstack/react-query";

import type { GetTeamIdPostsPostIdCommentsParams } from "@/apis/model";
import type {
  CommentIdVariables,
  PatchCommentVariables,
  PostCommentsVariables,
} from "@/apis/comments/commentsBff";
import {
  deleteComment,
  deleteCommentLike,
  getComments,
  patchComment,
  postCommentLike,
  postComments,
} from "@/apis/comments/commentsBff";

export const useGetComments = (
  postId: number,
  params?: GetTeamIdPostsPostIdCommentsParams,
) => {
  return useQuery({
    queryKey: [`/api/posts/${postId}/comments`, params],
    queryFn: ({ signal }) => getComments(postId, params, undefined, signal),
    enabled: !!postId,
  });
};

export const usePostComments = () => {
  return useMutation({
    mutationKey: ["postComments"],
    mutationFn: (variables: PostCommentsVariables) => postComments(variables),
  });
};

export const usePatchComment = () => {
  return useMutation({
    mutationKey: ["patchComment"],
    mutationFn: (variables: PatchCommentVariables) => patchComment(variables),
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: (variables: CommentIdVariables) => deleteComment(variables),
  });
};

export const usePostCommentLike = () => {
  return useMutation({
    mutationKey: ["postCommentLike"],
    mutationFn: (variables: CommentIdVariables) => postCommentLike(variables),
  });
};

export const useDeleteCommentLike = () => {
  return useMutation({
    mutationKey: ["deleteCommentLike"],
    mutationFn: (variables: CommentIdVariables) => deleteCommentLike(variables),
  });
};
