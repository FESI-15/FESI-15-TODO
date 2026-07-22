import { useMutation } from "@tanstack/react-query";

import type {
  PostFilesVariables,
  PostImagesVariables,
} from "@/apis/uploads/uploadsBff";
import { postFiles, postImages } from "@/apis/uploads/uploadsBff";

export const usePostImages = () => {
  return useMutation({
    mutationKey: ["postImages"],
    mutationFn: (variables: PostImagesVariables) => postImages(variables),
  });
};

export const usePostFiles = () => {
  return useMutation({
    mutationKey: ["postFiles"],
    mutationFn: (variables: PostFilesVariables) => postFiles(variables),
  });
};
