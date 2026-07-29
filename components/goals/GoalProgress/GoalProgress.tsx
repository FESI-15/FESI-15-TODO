interface GoalProgressProps {
  progress: number;
}

export default function GoalProgress({ progress }: GoalProgressProps) {
  return (
    <div className="flex h-[160px] flex-1 shrink-0 items-center rounded-[24px] bg-orange-500 p-8 text-white shadow-[0_10px_20px_rgba(255,158,89,0.4)] lg:w-[308px] lg:flex-none lg:rounded-[32px]">
      <div className="mr-8 size-[76px] shrink-0 rounded-full border-[12px] border-white/90 border-r-white/40 " />
      <div className="min-w-0">
        <p className="text-lg font-bold whitespace-nowrap">목표 진행도</p>
        <p className="text-[48px] leading-[52px] font-bold">
          {progress}
          <span className="ml-1 text-xl font-medium">%</span>
        </p>
      </div>
    </div>
  );
}
