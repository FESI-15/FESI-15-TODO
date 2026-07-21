import type {
  PostTeamIdFiles200,
  PostTeamIdFilesBody,
  PostTeamIdImages200,
  PostTeamIdImagesBody,
} from "@/apis/model";

import { bffInstance } from "@/apis/bffAxiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export interface PostImagesVariables {
  data: PostTeamIdImagesBody;
}

export interface PostFilesVariables {
  data: PostTeamIdFilesBody;
}

// 이미지 업로드 URL 발급
export const postImages = (
  { data }: PostImagesVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PostTeamIdImages200>(
    {
      url: "/api/images",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};

// 파일 업로드 URL 발급
export const postFiles = (
  { data }: PostFilesVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PostTeamIdFiles200>(
    {
      url: "/api/files",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};
