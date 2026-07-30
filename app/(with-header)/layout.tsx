import SideMenu from "@/components/layout/SideMenu/SideMenu";
import { getUserMeQueryOptionsServer } from "@/hooks/queries/users/users.server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function WithHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getUserMeQueryOptionsServer());
  return (
    <div className="flex-col flex md:flex-row flex-1">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SideMenu />
      </HydrationBoundary>
      {children}
    </div>
  );
}
