import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GetTeamIdGoalsParams } from "@/apis/model";
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
import { useRouter } from "next/navigation";

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

export const usePostGoals = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["postGoals"],
    mutationFn: (variables: PostGoalsVariables) => postGoals(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalsKeys.list() });
    },
  });
};

export const usePatchGoal = (goalId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["patchGoal"],
    mutationFn: (variables: PatchGoalVariables) => patchGoal(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalsKeys.detail(goalId) });
    },
  });
};

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["deleteGoal"],
    mutationFn: (variables: GoalIdVariables) => deleteGoal(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalsKeys.list() });
      router.replace("/dashboard");
    },
  });
};
