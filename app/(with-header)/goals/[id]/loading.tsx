import { Skeleton } from "@/components/ui/skeleton";

export default function GoalPageLoading() {
  return (
    <div className="py-8 px-4 md:px-6 md:py-12 lg:py-20 w-full">
      <div className="max-w-[1312px] mx-auto w-full">
        <Skeleton className="hidden lg:block w-[166px] h-8 mb-10" />
        <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:gap-8">
          <Skeleton className="w-full h-16 md:h-20 lg:h-[160px]" />
          <Skeleton className="w-full h-[144px] lg:w-[308px] lg:h-[160px]" />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2">
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="w-[47px] h-6 md:w-[53px] md:h-7" />
              <Skeleton className="w-[120px] h-10" />
            </div>
            <Skeleton className="w-full h-[420px] lg:h-[576px]" />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="w-[47px] h-6 md:w-[53px] md:h-7" />
              <div className="w-[120px] h-10" />
            </div>
            <Skeleton className="w-full h-[420px] lg:h-[576px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
