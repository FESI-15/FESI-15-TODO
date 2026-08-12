import SideMenu from "@/components/layout/SideMenu/SideMenu";
import { getUserMeQueryOptionsServer } from "@/hooks/queries/users/users.server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function WithHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery(getUserMeQueryOptionsServer());
  } catch (error) {
    throw error;
  }

  return (
    <div className="flex-col overflow-x-hidden flex lg:flex-row flex-1">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SideMenu />
        {children}
      </HydrationBoundary>
    </div>
  );
}
