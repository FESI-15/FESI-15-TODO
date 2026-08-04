import { getTodoFavoritesQueryOptionsServer } from "@/hooks/queries/favorites/favorites.server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Favorites from "@/components/favorites/Favorites";
import { notFound } from "next/navigation";

const FAVORITES_LIMIT = 100;

export default async function FavoritesPage() {
  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery(
      getTodoFavoritesQueryOptionsServer({ limit: FAVORITES_LIMIT }),
    );
  } catch {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Favorites />
    </HydrationBoundary>
  );
}
