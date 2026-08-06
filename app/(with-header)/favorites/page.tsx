import { getTodoFavoritesQueryOptionsServer } from "@/hooks/queries/favorites/favorites.server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Favorites from "@/components/favorites/Favorites";

const FAVORITES_LIMIT = 100;

export default async function FavoritesPage() {
  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery(
      getTodoFavoritesQueryOptionsServer({ limit: FAVORITES_LIMIT }),
    );
  } catch (error) {
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Favorites />
    </HydrationBoundary>
  );
}
