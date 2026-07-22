import SectionTitle from "@/components/dashboard/SectionTitle/SectionTitle";
import Image from "next/image";

interface ProgressCardProps {
  title: string;
}
export default function ProgressCard({ title }: ProgressCardProps) {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-2.5">
      <SectionTitle
        icon={
          <Image
            src="/icons/dashboard/progress.svg"
            alt="progress"
            width={40}
            height={40}
          />
        }
      >
        내 진행 상황
      </SectionTitle>
      <div className="relative flex h-64 overflow-hidden rounded-[40px] bg-blue-200 px-9 py-10 shadow-[0_10px_40px_rgba(0,212,190,0.24)]">
        <div className="flex items-center gap-8">
          <div className="relative size-40 rounded-full bg-white/90">
            <div className="absolute inset-5 rounded-full bg-blue-200" />
            <div className="absolute -right-1 top-16 size-7 rounded-full bg-white" />
          </div>
          <div className="z-10 text-white">
            <p className="text-xl font-semibold">{title}님의 진행도는</p>
            <div className="mt-3 flex items-end gap-1">
              <strong className="text-[80px] leading-[74px]">74</strong>
              <span className="text-3xl font-medium leading-9">%</span>
            </div>
          </div>
        </div>
        <Image
          className="absolute -bottom-12 -right-3"
          src="/icons/dashboard/progress_background.svg"
          alt="progress"
          width={222}
          height={215}
        />
      </div>
    </section>
  );
}
