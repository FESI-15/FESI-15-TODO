import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { MyPageInfo } from "@/components/mypage/MyPageInfo";
import { getUserMeQueryOptionsServer } from "@/hooks/queries/users/users.server";
import { getQueryClient } from "@/utils/getQueryClient";

export default async function MyPagePage() {
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery(getUserMeQueryOptionsServer());
  } catch {
    throw new Error();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex w-full flex-col items-start gap-10 px-8 py-[72px] lg:items-center">
        <h1 className="px-1 text-2xl font-semibold text-black hidden md:block">
          내 정보 관리
        </h1>
        <MyPageInfo />
      </div>
    </HydrationBoundary>
  );
}
