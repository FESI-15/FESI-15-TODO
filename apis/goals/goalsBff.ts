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

// 목표 목록 조회
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

// 목표 생성
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

// 목표 상세 조회
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

// 목표 수정
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

// 목표 삭제
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
