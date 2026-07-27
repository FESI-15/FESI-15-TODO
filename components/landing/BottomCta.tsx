import { SectionHeading } from "@/components/landing/SectionHeading";
import { CtaButton } from "@/components/landing/CtaButton";
import Star from "@/public/icons/landing/Star.svg";
import CheckboxIcon from "@/public/icons/landing/ic_checkbox.svg";

export function BottomCta() {
  return (
    <section className="flex w-full flex-col items-center bg-white px-4 py-4 md:px-8 md:py-15 lg:px-10 lg:py-10">
      <div className="relative flex w-full max-w-460 flex-col items-center gap-10 overflow-hidden rounded-[28px] bg-orange-100 px-6 py-14 md:gap-14 md:rounded-[48px] md:py-20 lg:gap-14 lg:rounded-[80px] lg:py-25">
        <Star className="absolute top-[9.92%] left-[16.61%] h-7 w-7 md:top-[11.2%] md:left-[16.6%] md:h-14 md:w-14 lg:top-[15.83%] lg:left-[17.72%] lg:h-20 lg:w-20" />
        <span className="absolute top-[22.4%] left-[7.8%] h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#c7f2cb] to-[#8ddcdc] shadow-[0px_6px_4px_0px_rgba(154,227,203,0.24)] md:top-[25.3%] md:left-[7.8%] md:h-4.75 md:w-4.75 lg:top-[35.9%] lg:left-[13.04%] lg:h-6.75 lg:w-6.75" />
        <span className="absolute top-[58.31%] left-[85.2%] flex h-7.25 w-7.25 rotate-[15deg] items-center justify-center rounded-[8px] bg-orange-500 shadow-[0px_10px_4px_0px_rgba(255,158,89,0.42)] md:top-[65.8%] md:h-14.5 md:w-14.5 lg:top-[43.05%] lg:left-[82.5%] lg:h-18.25 lg:w-18.25 lg:rounded-[17px] lg:shadow-[0px_23px_8.65px_0px_rgba(255,158,89,0.42)]">
          <CheckboxIcon className="h-[28px] w-[26px] md:h-[56px] md:w-[52px] lg:h-[70px] lg:w-[66px]" />
        </span>
        <SectionHeading
          subtitle="슬리드투두 하나로 정리부터 실행까지"
          title="오늘의 할 일, 슬리드 투두로 계획해요"
        />
        <CtaButton />
      </div>
    </section>
  );
}
