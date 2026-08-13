import Graph from "@/components/common/Graph";
import useCountAnimation from "@/hooks/useCountAnimation";

interface GoalProgressProps {
  progress: number;
}

export default function GoalProgress({ progress }: GoalProgressProps) {
  const { count } = useCountAnimation(progress);

  return (
    <div className="flex h-[160px] flex-1 shrink-0 items-center gap-6 rounded-[24px] bg-orange-500 p-8 text-white shadow-[0_10px_20px_rgba(255,158,89,0.4)] dark:border dark:border-[#a44d1d] dark:bg-[#572810] dark:shadow-none lg:w-[308px] lg:flex-none lg:rounded-[32px]">
      <Graph className="size-[76px] shrink-0" value={progress / 100} />
      <div className="min-w-0">
        <p className="text-lg font-bold whitespace-nowrap">목표 진행도</p>
        <p className="text-[48px] leading-[52px] font-bold">
          {count}
          <span className="ml-1 text-xl font-medium">%</span>
        </p>
      </div>
    </div>
  );
}
