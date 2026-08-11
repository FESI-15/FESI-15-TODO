import { Skeleton } from "@/components/ui/skeleton";

export default function FavoritesLoading() {
  return (
    <div className="my-6 px-4 md:my-12 md:px-6 lg:my-20 w-full">
      <div className="w-full max-w-[720px] mx-auto">
        <Skeleton className="hidden lg:block mb-6 w-[125px] h-8" />
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Skeleton className="w-[60px] h-[40px]" />
            <Skeleton className="w-[60px] h-[40px]" />
            <Skeleton className="w-[60px] h-[40px]" />
          </div>
        </div>
        <div className="bg-white rounded-[24px] md:rounded-[32px] h-[640px] mt-3 p-4 md:p-8 lg:h-[816px]">
          <Skeleton className="w-full h-14 mb-5" />
          <div className="flex flex-col gap-2 ">
            <Skeleton className="w-full h-[36px] md:h-[44px]" />
            <Skeleton className="w-full h-[36px] md:h-[44px]" />
            <Skeleton className="w-full h-[36px] md:h-[44px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
