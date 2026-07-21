import type {
  GetTeamIdGoals200,
  GetTeamIdGoalsGoalId200,
  GetTeamIdGoalsParams,
  PatchTeamIdGoalsGoalId200,
  PatchTeamIdGoalsGoalIdBody,
  PostTeamIdGoals201,
  PostTeamIdGoalsBody,
} from "@/apis/model";

import { bffInstance } from "@/apis/bffAxiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export interface PostGoalsVariables {
  data: PostTeamIdGoalsBody;
}

export interface GoalIdVariables {
  goalId: number;
}

export interface PatchGoalVariables extends GoalIdVariables {
  data: PatchTeamIdGoalsGoalIdBody;
}

export const getGoals = (
  params?: GetTeamIdGoalsParams,
  options?: SecondParameter<typeof bffInstance>,
  signal?: AbortSignal,
) => {
  return bffInstance<GetTeamIdGoals200>(
    {
      url: "/api/goals",
      method: "GET",
      params,
      signal,
    },
    options,
  );
};

export const postGoals = (
  { data }: PostGoalsVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PostTeamIdGoals201>(
    {
      url: "/api/goals",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};

export const getGoal = (
  { goalId }: GoalIdVariables,
  options?: SecondParameter<typeof bffInstance>,
  signal?: AbortSignal,
) => {
  return bffInstance<GetTeamIdGoalsGoalId200>(
    {
      url: `/api/goals/${goalId}`,
      method: "GET",
      signal,
    },
    options,
  );
};

export const patchGoal = (
  { goalId, data }: PatchGoalVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PatchTeamIdGoalsGoalId200>(
    {
      url: `/api/goals/${goalId}`,
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};

export const deleteGoal = (
  { goalId }: GoalIdVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<void>(
    {
      url: `/api/goals/${goalId}`,
      method: "DELETE",
    },
    options,
  );
};
