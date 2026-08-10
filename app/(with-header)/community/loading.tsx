import { Skeleton } from "@/components/ui/skeleton";

export default function CommunityLoading() {
  return (
    <div className="py-6 mb:py-12 max-w-[1200px] mx-auto w-full lg:py-20">
      <div className="px-4 md:px-6">
        <Skeleton className="w-[106px] h-8 hidden lg:block mb-10" />
        <div className="flex gap-4">
          <Skeleton className="w-[260px] h-[204px] md:w-[384px] md:h-[248px] shrink-0" />
          <Skeleton className="w-[260px] h-[204px] md:w-[384px] md:h-[248px] shrink-0" />
          <Skeleton className="w-[260px] h-[204px] md:w-[384px] md:h-[248px] shrink-0" />
          <Skeleton className="w-[260px] h-[204px] md:w-[384px] md:h-[248px] shrink-0" />
          <Skeleton className="w-[260px] h-[204px] md:w-[384px] md:h-[248px] shrink-0" />
          <Skeleton className="w-[260px] h-[204px] md:w-[384px] md:h-[248px] shrink-0" />
        </div>
      </div>
      <div className="mt-12 px-4 md:px-6 md:mt-[54px] lg:mt-[62px]">
        <Skeleton className="w-full h-[38px] mb:h-[46px]" />
        <div className="flex flex-col gap-5 mt-10">
          <Skeleton className="w-full h-[160px]" />
          <Skeleton className="w-full h-[210px]" />
          <Skeleton className="w-full h-[210px]" />
          <Skeleton className="w-full h-[210px]" />
          <Skeleton className="w-full h-[210px]" />
        </div>
      </div>
    </div>
  );
}
