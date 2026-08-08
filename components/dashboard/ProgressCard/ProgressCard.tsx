import SectionTitle from "@/components/dashboard/SectionTitle/SectionTitle";
import Graph from "@/components/common/Graph";
import Image from "next/image";

interface ProgressCardProps {
  title: string;
  progress: number;
}
export default function ProgressCard({ title, progress }: ProgressCardProps) {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-2.5">
      <SectionTitle
        icon={
          <Image
            className="w-[32px] h-[32px] lg:w-[40px] lg:h-[40px]"
            src="/icons/dashboard/progress.svg"
            alt="progress"
            width={40}
            height={40}
          />
        }
      >
        내 진행 상황
      </SectionTitle>
      <div className="relative flex h-[186px] lg:h-64 overflow-hidden rounded-[28px] lg:rounded-[40px] bg-blue-200 dark:bg-[#03585b] px-6 lg:px-12 shadow-[0_10px_40px_rgba(0,212,190,0.24)] dark:shadow-none">
        <div className="flex items-center gap-8 z-1">
          <Graph
            className="size-[92px] lg:size-[160px]"
            value={progress / 100}
          />
          <div className="z-10 text-white">
            <p className="text-sm lg:text-xl font-semibold whitespace-nowrap">
              {title}님의 진행도는
            </p>
            <div className="mt-1 lg:mt-3 flex items-end gap-1">
              <strong className="text-[48px] lg:text-[80px] leading-[52px] lg:leading-[74px]">
                {progress}
              </strong>
              <span className="text-xl lg:text-3xl font-medium leading-6 lg:leading-9">
                %
              </span>
            </div>
          </div>
        </div>
        <Image
          className="absolute -bottom-12 -right-3 w-[151px] h-[137px] lg:w-[222px] lg:h-[215px]"
          src="/icons/dashboard/progress_background.svg"
          alt="progress"
          width={222}
          height={215}
        />
      </div>
    </section>
  );
}
