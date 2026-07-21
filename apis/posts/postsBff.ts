import type {
  GetTeamIdPosts200,
  GetTeamIdPostsParams,
  GetTeamIdPostsPostId200,
  PatchTeamIdPostsPostId200,
  PatchTeamIdPostsPostIdBody,
  PostTeamIdPosts201,
  PostTeamIdPostsBody,
} from "@/apis/model";

import { bffInstance } from "@/apis/bffAxiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export interface PostIdVariables {
  postId: number;
}

export interface PostPostsVariables {
  data: PostTeamIdPostsBody;
}

export interface PatchPostVariables extends PostIdVariables {
  data: PatchTeamIdPostsPostIdBody;
}

export const getPosts = (
  params?: GetTeamIdPostsParams,
  options?: SecondParameter<typeof bffInstance>,
  signal?: AbortSignal,
) => {
  return bffInstance<GetTeamIdPosts200>(
    { url: "/api/posts", method: "GET", params, signal },
    options,
  );
};

export const postPosts = (
  { data }: PostPostsVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PostTeamIdPosts201>(
    {
      url: "/api/posts",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};

export const getPost = (
  { postId }: PostIdVariables,
  options?: SecondParameter<typeof bffInstance>,
  signal?: AbortSignal,
) => {
  return bffInstance<GetTeamIdPostsPostId200>(
    { url: `/api/posts/${postId}`, method: "GET", signal },
    options,
  );
};

export const patchPost = (
  { postId, data }: PatchPostVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PatchTeamIdPostsPostId200>(
    {
      url: `/api/posts/${postId}`,
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};

export const deletePost = (
  { postId }: PostIdVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<void>(
    { url: `/api/posts/${postId}`, method: "DELETE" },
    options,
  );
};
