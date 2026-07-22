import { useMutation, useQuery } from "@tanstack/react-query";
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

export const useGetGoals = (params?: GetTeamIdGoalsParams) => {
  return useQuery({
    queryKey: ["/api/goals", params],
    queryFn: ({ signal }) => getGoals(params, undefined, signal),
  });
};

export const useGetGoal = (goalId: number) => {
  return useQuery({
    queryKey: [`/api/goals/${goalId}`],
    queryFn: ({ signal }) => getGoal({ goalId }, undefined, signal),
    enabled: !!goalId,
  });
};

export const usePostGoals = () => {
  return useMutation({
    mutationKey: ["postGoals"],
    mutationFn: (variables: PostGoalsVariables) => postGoals(variables),
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
