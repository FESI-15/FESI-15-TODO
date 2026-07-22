import type { GetTeamIdTodosParams } from "@/apis/model";
import { getTeamIdTodos } from "@/apis/todos/todos";
import { TEAM_ID } from "@/constants/auth";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { queryOptions } from "@tanstack/react-query";
import { getTodosQueryKey } from "./todos.bff.hook";

export const getTodosQueryOptionsServer = (params?: GetTeamIdTodosParams) =>
  queryOptions({
    queryKey: getTodosQueryKey(params),
    queryFn: async ({ signal }) => {
      const headers = await getAuthorizationHeaders();

      if (!TEAM_ID || !headers) {
        throw new Error("Authentication is required.");
      }

      const response = await getTeamIdTodos(
        TEAM_ID,
        params,
        { headers },
        signal,
      );

      return { data: response.data };
    },
  });
