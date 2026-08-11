import { Skeleton } from "@/components/ui/skeleton";

export default function MyPageLoading() {
  return (
    <div className="w-full p-4 md:px-8 md:py-12 lg:py-[72px]">
      <div className="w-full lg:max-w-[560px] mx-auto">
        <Skeleton className="w-[111px] h-8 mb-10 hidden lg:block" />
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:px-8 md:py-10">
          <Skeleton className="size-[132px] mx-auto rounded-full mb-8 md:mb-12" />
          <div className="mb-4 flex flex-col gap-2">
            <Skeleton className="w-9 h-5 md:w-10 md:h-6" />
            <Skeleton className="w-full h-11 md:h-14" />
          </div>
          <div className="mb-10 flex flex-col gap-2">
            <Skeleton className="w-6 h-5 md:w-7 md:h-6" />
            <Skeleton className="w-full h-11 md:h-14" />
          </div>
          <div className="mb-12 flex flex-col gap-2">
            <Skeleton className="w-[74px] h-5 md:w-21 md:h-6" />
            <div className="flex flex-col gap-3">
              <Skeleton className="w-full h-11 md:h-14" />
              <Skeleton className="w-full h-11 md:h-14" />
              <Skeleton className="w-full h-11 md:h-14" />
            </div>
          </div>
          <Skeleton className="w-full h-12 md:h-14" />
        </div>
      </div>
    </div>
  );
}
