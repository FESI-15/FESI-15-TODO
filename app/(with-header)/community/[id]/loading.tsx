import { Skeleton } from "@/components/ui/skeleton";

export default function CommunityDetailLoading() {
  return (
    <div className="p-4 w-full md:px-6 md:py-12 lg:py-20">
      <div className="w-full bg-white rounded-[24px] py-6 px-4 max-w-[768px] mx-auto md:p-10">
        <div className="flex flex-col gap-4">
          <Skeleton className="w-[200px] h-6 md:h-8" />
          <Skeleton className="w-[66px] h-5 md:w-[86px] md:h-6" />
        </div>
        <div className="mt-10">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-[300px] h-6 md:h-7" />
            <Skeleton className="w-[200px] h-6 md:h-7" />
          </div>
          <div className="mt-6 md:mt-8">
            <Skeleton className="size-[150px] md:size-[232px]" />
          </div>
          <Skeleton className="w-[114px] h-4 mt-4 md:w-[130px] md:h-5 md:mt-6" />
        </div>
        <div className="mt-10 md:mt-[56px]">
          <Skeleton className="w-10 h-6 md:w-[47px] md:h-7" />
          <div className="flex gap-3 mt-4 items-center justify-between md:gap-4">
            <Skeleton className="w-full h-11 md:h-14" />
            <Skeleton className="w-16 h-10 md:h-12" />
          </div>
          <div className="mt-6 flex flex-col gap-8 md:gap-10">
            <div>
              <Skeleton className="w-[56px] h-5" />
              <div className="mt-3">
                <Skeleton className="w-[250px] h-5 md:h-6 " />
                <Skeleton className="w-[200px] h-5 mt-1 md:h-6" />
                <Skeleton className="w-[62px] h-4 mt-2 md:w-[69px] md:h-5" />
              </div>
            </div>
            <div>
              <Skeleton className="w-[56px] h-5" />
              <div className="mt-3">
                <Skeleton className="w-[250px] h-5 md:h-6 " />
                <Skeleton className="w-[200px] h-5 mt-1 md:h-6" />
                <Skeleton className="w-[62px] h-4 mt-2 md:w-[69px] md:h-5" />
              </div>
            </div>
            <div>
              <Skeleton className="w-[56px] h-5" />
              <div className="mt-3">
                <Skeleton className="w-[250px] h-5 md:h-6 " />
                <Skeleton className="w-[200px] h-5 mt-1 md:h-6" />
                <Skeleton className="w-[62px] h-4 mt-2 md:w-[69px] md:h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
