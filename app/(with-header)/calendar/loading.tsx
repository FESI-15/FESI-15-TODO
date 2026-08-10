import { Skeleton } from "@/components/ui/skeleton";

export default function CalendarLoading() {
  return (
    <div className="py-8 px-4 md:py-12 md:px-6 lg:py-20 w-full">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="flex items-center justify-end lg:justify-between">
          <Skeleton className="w-[171px] h-12 hidden lg:block" />
          <Skeleton className="w-[105px] h-10 md:w-[117px]" />
        </div>
        <Skeleton className="w-full h-[800px] mt-6" />
      </div>
    </div>
  );
}
