import { GetTeamIdGoalsParams } from "@/apis/model";
import { queryOptions } from "@tanstack/react-query";
import { getGoalsQueryKey } from "../goals.bff.hook";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { getTeamIdGoals } from "@/apis/goals/goals";

export const getGoalsQueryOptionsServer = (params?: GetTeamIdGoalsParams) =>
  queryOptions({
    queryKey: getGoalsQueryKey(params),
    queryFn: async ({ signal }) => {
      const headers = await getAuthorizationHeaders();

      if (!headers) {
        throw new Error("Authentication is required.");
      }

      const response = await getTeamIdGoals(params, { headers }, signal);

      return { data: response.data };
    },
  });
