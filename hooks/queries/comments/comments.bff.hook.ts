import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { GetTeamIdPostsPostIdCommentsParams } from "@/apis/model";
import type {
  CommentIdVariables,
  PatchCommentVariables,
  PostCommentsVariables,
} from "@/apis/comments/commentsBff";
import { commentsKeys } from "./comments.key";
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
    queryKey: commentsKeys.list(postId, params),
    queryFn: ({ signal }) => getComments(postId, params, undefined, signal),
    enabled: !!postId,
  });
};

export const usePostComments = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["postComments"],
    mutationFn: (variables: PostCommentsVariables) => postComments(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsKeys.list(postId) });
    },
  });
};

export const usePatchComment = () => {
  return useMutation({
    mutationKey: ["patchComment"],
    mutationFn: (variables: PatchCommentVariables) => patchComment(variables),
  });
};

export const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: (variables: CommentIdVariables) => deleteComment(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsKeys.list(postId) });
    },
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
