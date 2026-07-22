import type { GetTeamIdGoalsParams } from "@/apis/model";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { getTeamIdGoals } from "@/apis/goals/goals";

export const getGoalsQueryOptionsServer = (params?: GetTeamIdGoalsParams) => ({
  queryKey: ["/api/goals", params],
  queryFn: async ({ signal }: { signal: AbortSignal }) => {
    const headers = await getAuthorizationHeaders();

    if (!headers) {
      throw new Error("Authentication is required.");
    }

    const response = await getTeamIdGoals(params, { headers }, signal);

    return { data: response.data };
  },
});
