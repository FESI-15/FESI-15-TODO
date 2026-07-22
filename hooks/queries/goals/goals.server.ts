import type { GetTeamIdGoalsParams } from "@/apis/model";
import { getTeamIdGoals } from "@/apis/goals/goals";
import { TEAM_ID } from "@/constants/auth";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { queryOptions } from "@tanstack/react-query";
import { getGoalsQueryKey } from "./goals.bff.hook";

export const getGoalsQueryOptionsServer = (params?: GetTeamIdGoalsParams) =>
  queryOptions({
    queryKey: getGoalsQueryKey(params),
    queryFn: async ({ signal }) => {
      const headers = await getAuthorizationHeaders();

      if (!TEAM_ID || !headers) {
        throw new Error("Authentication is required.");
      }

      const response = await getTeamIdGoals(
        TEAM_ID,
        params,
        { headers },
        signal,
      );

      return { data: response.data };
    },
  });
