import type { GetTeamIdPostsParams } from "@/apis/model";

export const postsKeys = {
  list: (params?: GetTeamIdPostsParams) => ["/api/posts", params] as const,
  detail: (id: number) => [`/api/posts/${id}`] as const,
};
