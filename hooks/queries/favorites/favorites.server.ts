import type { GetTeamIdTodosFavoritesParams } from "@/apis/model";
import { getTeamIdTodosFavorites } from "@/apis/favorites/favorites";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { favoritesKeys } from "./favorites.key";

export const getTodoFavoritesQueryOptionsServer = (
  params?: GetTeamIdTodosFavoritesParams,
) => ({
  queryKey: favoritesKeys.todos(params),
  queryFn: async ({ signal }: { signal: AbortSignal }) => {
    const headers = await getAuthorizationHeaders();

    if (!headers) {
      throw new Error("Authentication is required.");
    }

    const response = await getTeamIdTodosFavorites(params, { headers }, signal);

    return { data: response.data };
  },
});
