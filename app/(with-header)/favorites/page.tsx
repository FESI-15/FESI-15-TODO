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

  await queryClient.prefetchQuery(
    getTodoFavoritesQueryOptionsServer({ limit: FAVORITES_LIMIT }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Favorites />
    </HydrationBoundary>
  );
}
