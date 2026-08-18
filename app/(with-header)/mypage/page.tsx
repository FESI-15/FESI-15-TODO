import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { MyPageInfo } from "@/components/mypage/MyPageInfo";
import { getUserMeQueryOptionsServer } from "@/hooks/queries/users/users.server";
import { getQueryClient } from "@/utils/getQueryClient";

export default async function MyPagePage() {
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery(getUserMeQueryOptionsServer());
  } catch (error) {
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full p-4 md:px-8 md:py-12 lg:py-[72px]">
        <div className="w-full lg:max-w-[560px] mx-auto">
          <MyPageInfo />
        </div>
      </div>
    </HydrationBoundary>
  );
}
