import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { GetTeamIdPostsParams } from "@/apis/model";
import type {
  PatchPostVariables,
  PostIdVariables,
  PostPostsVariables,
} from "@/apis/posts/postsBff";
import {
  deletePost,
  getPost,
  getPosts,
  patchPost,
  postPosts,
} from "@/apis/posts/postsBff";
import { postsKeys } from "./posts.key";

export const useGetPosts = (params?: GetTeamIdPostsParams) => {
  return useQuery({
    queryKey: postsKeys.list(params),
    queryFn: ({ signal }) => getPosts(params, undefined, signal),
  });
};

export const useGetPost = ({ postId }: PostIdVariables) => {
  return useQuery({
    queryKey: postsKeys.detail(postId),
    queryFn: ({ signal }) => getPost({ postId }, undefined, signal),
    enabled: !!postId,
  });
};

export const usePostPosts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["postPosts"],
    mutationFn: (variables: PostPostsVariables) => postPosts(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.list() });
    },
  });
};

export const usePatchPost = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["patchPost"],
    mutationFn: (variables: PatchPostVariables) => patchPost(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.detail(id) });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (variables: PostIdVariables) => deletePost(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.list() });
    },
  });
};
