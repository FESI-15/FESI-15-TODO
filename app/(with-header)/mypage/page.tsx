import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { MyPageInfo } from "@/components/mypage/MyPageInfo";
import { getUserMeQueryOptionsServer } from "@/hooks/queries/users/users.server";

export default async function MyPagePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getUserMeQueryOptionsServer());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex w-full flex-col items-start gap-10 px-8 py-[72px] lg:items-center">
        <h1 className="px-1 text-2xl font-semibold text-black">내 정보 관리</h1>
        <MyPageInfo />
      </div>
    </HydrationBoundary>
  );
}
