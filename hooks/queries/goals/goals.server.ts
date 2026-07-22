import type { GetTeamIdGoalsParams } from "@/apis/model";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { getTeamIdGoals } from "@/apis/goals/goals";
import { getGoal } from "@/apis/goals/goalsBff";
import { goalsKeys } from "./goals.key";

export const getGoalsQueryOptionsServer = (params?: GetTeamIdGoalsParams) => ({
  queryKey: goalsKeys.list(params),
  queryFn: async ({ signal }: { signal: AbortSignal }) => {
    const headers = await getAuthorizationHeaders();

    if (!headers) {
      throw new Error("Authentication is required.");
    }

    const response = await getTeamIdGoals(params, { headers }, signal);

    return { data: response.data };
  },
});

export const getGoalQueryOptionsServer = (goalId: number) => ({
  queryKey: goalsKeys.detail(goalId),
  queryFn: async ({ signal }: { signal: AbortSignal }) => {
    const headers = await getAuthorizationHeaders();

    if (!headers) {
      throw new Error("Authentication is required.");
    }

    const response = await getGoal({ goalId }, { headers }, signal);

    return { data: response.data };
  },
});
