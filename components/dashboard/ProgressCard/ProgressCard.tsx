import { PieChart } from "lucide-react";

import SectionTitle from "@/components/dashboard/SectionTitle/SectionTitle";

export default function ProgressCard() {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-2.5">
      <SectionTitle
        icon={<PieChart className="size-6 fill-blue-200 text-blue-300" />}
        iconClassName="bg-blue-100"
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
            <p className="text-xl font-semibold">체다치즈님의 진행도는</p>
            <div className="mt-3 flex items-end gap-1">
              <strong className="text-[80px] leading-[74px]">74</strong>
              <span className="text-3xl font-medium leading-9">%</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[-28px] right-9 size-36 rounded-full bg-blue-100/30" />
        <div className="absolute bottom-2 right-20 h-9 w-28 rotate-[18deg] rounded-full bg-blue-300/50" />
      </div>
    </section>
  );
}
