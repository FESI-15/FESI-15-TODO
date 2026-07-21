import { QueryKey, useQueryClient } from "@tanstack/react-query";

export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();

  const invalidateQuery = (queryKey: QueryKey) => {
    return queryClient.invalidateQueries({ queryKey });
  };

  return { invalidateQuery };
};
