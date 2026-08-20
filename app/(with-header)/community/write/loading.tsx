import { Skeleton } from "@/components/ui/skeleton";

export default function CommunityWriteLoading() {
  return (
    <div className="p-4 flex-1 flex flex-col md:py-12 md:px-6 lg:py-20">
      <div className="flex-col flex flex-1 max-w-[768px] mx-auto w-full">
        <div className="flex justify-end lg:justify-between items-center mb-3">
          <Skeleton className="w-[130px] h-7 hidden lg:block" />
          <div className="flex gap-2">
            <Skeleton className="w-[106px] h-8 lg:h-10" />
            <Skeleton className="w-[106px] h-8 lg:h-10" />
          </div>
        </div>
        <div className="flex flex-col bg-white rounded-[24px] p-4 md:p-10 flex-1">
          <div className="flex items-center justify-between">
            <Skeleton className="w-[200px] h-6" />
            <Skeleton className="w-7 h-4" />
          </div>
          <div className="mt-7">
            <Skeleton className="w-full h-[76px] md:h-10" />
          </div>
          <div className="flex-1">
            <Skeleton className="w-[250px] h-5 mt-4" />
            <Skeleton className="w-[200px] h-5 mt-1" />
          </div>
          <Skeleton className="size-[150px]" />
        </div>
      </div>
    </div>
  );
}
