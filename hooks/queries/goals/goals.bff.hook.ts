import { useMutation, useQuery } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  GetTeamIdGoalsParams,
  PostTeamIdGoals400,
  PostTeamIdGoals401,
} from "@/apis/model";
import type {
  GoalIdVariables,
  PatchGoalVariables,
  PostGoalsVariables,
} from "@/apis/goals/goalsBff";
import {
  deleteGoal,
  getGoal,
  getGoals,
  patchGoal,
  postGoals,
} from "@/apis/goals/goalsBff";
import { goalsKeys } from "./goals.key";

export const useGetGoals = (params?: GetTeamIdGoalsParams) => {
  return useQuery({
    queryKey: goalsKeys.list(params),
    queryFn: ({ signal }) => getGoals(params, undefined, signal),
  });
};

export const useGetGoal = (goalId: number) => {
  return useQuery({
    queryKey: goalsKeys.detail(goalId),
    queryFn: ({ signal }) => getGoal({ goalId }, undefined, signal),
    enabled: !!goalId,
  });
};

export const usePostGoals = <
  TError = PostTeamIdGoals400 | PostTeamIdGoals401,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postGoals>>,
    TError,
    PostGoalsVariables,
    TContext
  >;
}) => {
  return useMutation({
    mutationKey: ["postGoals"],
    mutationFn: (variables: PostGoalsVariables) => postGoals(variables),
    ...options?.mutation,
  });
};

export const usePatchGoal = () => {
  return useMutation({
    mutationKey: ["patchGoal"],
    mutationFn: (variables: PatchGoalVariables) => patchGoal(variables),
  });
};

export const useDeleteGoal = () => {
  return useMutation({
    mutationKey: ["deleteGoal"],
    mutationFn: (variables: GoalIdVariables) => deleteGoal(variables),
  });
};
