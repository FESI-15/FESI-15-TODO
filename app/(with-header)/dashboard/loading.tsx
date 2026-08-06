import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="mt-8 px-4">
      <div className="w-full flex justify-between items-center">
        <Skeleton className="w-[141px] h-[32px]" />
        <Skeleton className="w-[71px] h-[20px]" />
      </div>
      <div>
        <Skeleton className="w-full h-[186px] mt-2.5" />
      </div>
    </div>
  );
}
