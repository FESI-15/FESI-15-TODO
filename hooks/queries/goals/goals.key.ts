import type { GetTeamIdGoalsParams } from "@/apis/model";

export const goalsKeys = {
  list: (params?: GetTeamIdGoalsParams) => ["/api/goals", params] as const,
  detail: (id: number) => [`/api/goals/${id}`] as const,
};
