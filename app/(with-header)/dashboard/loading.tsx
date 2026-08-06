import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="my-8 px-4 w-full max-w-[1312px] mx-auto md:mt-12 lg:mt-20">
      <Skeleton className="hidden md:block w-[172px] h-[30px] mb-7 lg:w-[206px] lg:h-[32px] lg:mb-8" />
      <div className="flex flex-col md:flex-row gap-10 md:gap-3">
        <div className="flex-1">
          <div className="w-full flex justify-between items-center">
            <Skeleton className="w-[141px] h-[32px] lg:w-[166px] lg:h-10" />
            <Skeleton className="w-[71px] h-[20px]" />
          </div>
          <div>
            <Skeleton className="w-full h-[186px] mt-2.5 lg:h-[256px]" />
          </div>
        </div>

        <div className="md:mt-0 flex-1">
          <div className="w-full flex justify-between items-center">
            <Skeleton className="w-[141px] h-[32px] lg:w-[136px] lg:h-10" />
          </div>
          <div>
            <Skeleton className="w-full h-[186px] mt-2.5 lg:h-[256px]" />
          </div>
        </div>
      </div>

      <Skeleton className="w-[123px] h-10 mt-10 lg:w-[136px]" />
      <div className="flex flex-col gap-6 mt-3">
        <Skeleton className="w-full h-[600px] md:h-[364px] lg:h-[428px]" />
        <Skeleton className="w-full h-[600px] md:h-[364px] lg:h-[428px]" />
      </div>
    </div>
  );
}
