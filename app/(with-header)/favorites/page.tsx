import { getTodoFavoritesQueryOptionsServer } from "@/hooks/queries/favorites/favorites.server";
import { getGoalsQueryOptionsServer } from "@/hooks/queries/goals/goals.server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Favorites from "@/components/favorites/Favorites";
import { FAVORITES_LIMIT } from "@/constants/pagination";

export default async function FavoritesPage() {
  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.fetchQuery(
        getTodoFavoritesQueryOptionsServer({ limit: FAVORITES_LIMIT }),
      ),
      queryClient.fetchQuery(getGoalsQueryOptionsServer()),
    ]);
  } catch (error) {
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Favorites />
    </HydrationBoundary>
  );
}
