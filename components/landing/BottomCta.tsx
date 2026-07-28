import { SectionHeading } from "@/components/landing/SectionHeading";
import { CtaButton } from "@/components/landing/CtaButton";
import Star from "@/public/icons/landing/Star.svg";
import CheckboxIcon from "@/public/icons/landing/ic_checkbox.svg";

export function BottomCta() {
  return (
    <section className="flex w-full flex-col items-center bg-white px-4 py-4 md:px-8 md:py-15 lg:px-10 lg:py-10">
      <div className="relative flex w-full max-w-[1300px] flex-col items-center gap-10 overflow-hidden rounded-[28px] bg-orange-100 px-6 pt-[101px] pb-[56px] md:gap-[48px] md:rounded-[48px] md:py-[163px] lg:gap-14 lg:rounded-[80px] lg:py-[150px]">
        <Star className="absolute top-[clamp(29.26px,4.952vw+10.69px,82px)] left-[clamp(56.97px,16.281vw-4.08px,230.36px)] h-[clamp(28.25px,4.859vw+10.03px,80px)] w-[clamp(28.25px,4.859vw+10.03px,80px)]" />
        <span className="absolute top-[clamp(66.08px,11.259vw+23.86px,186px)] left-[clamp(26.75px,13.405vw-23.52px,169.52px)] h-[clamp(9.58px,1.635vw+3.45px,27px)] w-[clamp(9.58px,1.635vw+3.45px,27px)] rounded-full bg-gradient-to-br from-[#c7f2cb] to-[#8ddcdc] shadow-[0px_6px_4px_0px_rgba(154,227,203,0.24)]" />
        <span className="absolute top-[172px] left-[clamp(292.32px,73.256vw+17.61px,1072.5px)] flex h-[clamp(29.55px,4.106vw+14.15px,73.28px)] w-[clamp(29.55px,4.106vw+14.15px,73.28px)] rotate-[15deg] items-center justify-center rounded-[clamp(8px,0.845vw+4.83px,17px)] bg-orange-500 shadow-[0px_10px_4px_0px_rgba(255,158,89,0.42)] md:top-[341px] lg:top-[clamp(223px,-33.146vw+680.42px,341px)] lg:shadow-[0px_23px_8.65px_0px_rgba(255,158,89,0.42)]">
          <CheckboxIcon className="h-[clamp(34.14px,3.407vw+21.36px,70.43px)] w-[clamp(28.38px,3.585vw+14.94px,66.56px)]" />
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
