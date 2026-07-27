import { SectionHeading } from "@/components/landing/SectionHeading";
import BubbleCircle from "@/public/icons/landing/bubbleCircle.svg";
import BubbleMint from "@/public/icons/landing/bubbleMint.svg";
import BubbleYellow from "@/public/icons/landing/bubbleYellow.svg";
import DotPill from "@/public/icons/landing/dotPill.svg";
import Sparkle from "@/public/icons/landing/sparkle.svg";
import Swirl from "@/public/icons/landing/swirl.svg";

export function Community() {
  return (
    <section className="flex w-full flex-col-reverse items-center gap-16 overflow-hidden bg-white px-4 py-15 md:gap-20 md:px-4 md:pt-20 md:pb-16.25 lg:flex-row lg:justify-center lg:gap-57">
      <div className="relative h-[179px] w-[285px] shrink-0 md:h-[423px] md:w-[673px] lg:h-[447.73px] lg:w-[712.76px]">
        <div className="absolute top-0 left-0 h-[447.73px] w-[712.76px] origin-top-left scale-[0.4] md:scale-[0.944] lg:scale-100">
          <Sparkle className="absolute top-[24.43px] left-[95.15px] h-[49px] w-[17px] -translate-x-1/2 -translate-y-1/2 rotate-[-4.47deg]" />
          <Sparkle className="absolute top-[39.34px] left-[52.98px] h-[49px] w-[17px] -translate-x-1/2 -translate-y-1/2 rotate-[-35.37deg]" />
          <Sparkle className="absolute top-[72.78px] left-[24.53px] h-[49px] w-[17px] -translate-x-1/2 -translate-y-1/2 rotate-[-65.37deg]" />

          <div className="absolute top-4 left-[302px] h-[211.037px] w-[410.759px]">
            <BubbleMint className="absolute top-1/2 left-1/2 h-[316px] w-[516px] -translate-x-1/2 -translate-y-1/2 -scale-y-100 rotate-[-175.02deg]" />
          </div>

          <div className="absolute top-[86px] left-[43px] h-[256.74px] w-[331.142px]">
            <BubbleYellow className="absolute top-1/2 left-1/2 h-[354px] w-[422px] -translate-x-1/2 -translate-y-1/2 rotate-[-8.57deg]" />
          </div>

          <div className="absolute top-[214px] left-[254px] h-[233.727px] w-[230.664px]">
            <BubbleCircle className="absolute top-1/2 left-1/2 h-[328px] w-[329px] -translate-x-1/2 -translate-y-1/2 rotate-[6.17deg]" />
          </div>

          <DotPill className="absolute top-[227px] left-[25px] h-[50px] w-[94px]" />

          <Swirl className="absolute top-[197px] left-[513px] h-[202.492px] w-[240.741px] -scale-x-100" />
        </div>
      </div>

      <div className="self-end lg:self-auto">
        <SectionHeading
          align="right"
          subtitle="활발한 소통 게시판"
          title={["다양한 사람들과", "서로의 목표를 응원해요"]}
        />
      </div>
    </section>
  );
}
