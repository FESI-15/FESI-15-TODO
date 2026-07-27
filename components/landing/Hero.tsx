import Image from "next/image";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { CtaButton } from "@/components/landing/CtaButton";
import dashboardImage from "@/public/images/landing/dashboard.png";

export function Hero() {
  return (
    <section className="flex w-full flex-col items-center gap-19.25 bg-[linear-gradient(220.48deg,_#fff9e6_20.84%,_#d4fffe_93.31%)] px-4 pt-20 md:gap-17.5 md:pt-28 lg:gap-18.75 lg:pt-36.5">
      <div className="flex flex-col items-center gap-10 text-center md:gap-12 lg:gap-14">
        <SectionHeading
          as="h1"
          subtitle="슬리드투두 하나로 정리부터 실행까지"
          title="오늘의 할 일, 슬리드 투두로 계획해요"
        />
        <CtaButton />
      </div>

      <Image
        src={dashboardImage}
        alt="슬리드투두 대시보드 미리보기"
        width={1317}
        height={641}
        priority
        className="h-auto w-full max-w-81.75 md:max-w-161 lg:max-w-329.25"
      />
    </section>
  );
}
