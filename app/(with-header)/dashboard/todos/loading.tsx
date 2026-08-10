import { Skeleton } from "@/components/ui/skeleton";

export default function TodosLoading() {
  return (
    <div className="my-6 px-4 w-full max-w-[720px] mx-auto md:my-12 lg:my-21">
      <Skeleton className="w-[106px] h-[30px] hidden md:block mb-6 lg:w-[125px] lg:h-8" />
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Skeleton className="w-[60px] h-[40px]" />
          <Skeleton className="w-[60px] h-[40px]" />
          <Skeleton className="w-[60px] h-[40px]" />
        </div>
        <Skeleton className="w-[104px] h-[40px] md:w-[120px]" />
      </div>
      <Skeleton className="h-[640px] mt-3 p-4 flex flex-col gap-2 md:p-8 lg:h-[816px]">
        <Skeleton className="w-full h-[36px] bg-gray-400 md:h-[44px]" />
        <Skeleton className="w-full h-[36px] bg-gray-400 md:h-[44px]" />
        <Skeleton className="w-full h-[36px] bg-gray-400 md:h-[44px]" />
      </Skeleton>
    </div>
  );
}
