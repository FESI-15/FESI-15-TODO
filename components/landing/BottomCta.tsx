"use client";

import { m } from "motion/react";
import {
  headingContainerVariants,
  titleVariants,
  sectionHeadingSubtitleClassName,
} from "@/components/landing/SectionHeading";
import {
  titleContainerVariants,
  titleItemVariants,
  renderAnimatedWords,
} from "@/components/landing/titleAnimation";
import { CtaButton } from "@/components/landing/CtaButton";
import Star from "@/public/icons/landing/Star.svg";
import CheckboxIcon from "@/public/icons/landing/ic_checkbox.svg";

export function BottomCta() {
  return (
    <section className="flex w-full flex-col items-center bg-white px-4 py-4 md:px-8 md:py-15 lg:px-10 lg:py-10">
      <div className="relative flex w-full max-w-[1300px] flex-col items-center gap-10 overflow-hidden rounded-[28px] bg-orange-100 px-6 pt-[101px] pb-[56px] md:gap-[48px] md:rounded-[48px] md:py-[163px] lg:gap-14 lg:rounded-[80px] lg:py-[150px]">
        <m.div
          className="absolute top-[clamp(29.26px,4.952vw+10.69px,82px)] left-[clamp(56.97px,16.281vw-4.08px,230.36px)] h-[clamp(28.25px,4.859vw+10.03px,80px)] w-[clamp(28.25px,4.859vw+10.03px,80px)]"
          animate={{ y: [0, -8, 0], rotate: [-10, 10, -10] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star className="h-full w-full" />
        </m.div>
        <m.span
          className="absolute top-[clamp(66.08px,11.259vw+23.86px,186px)] left-[clamp(26.75px,13.405vw-23.52px,169.52px)] h-[clamp(9.58px,1.635vw+3.45px,27px)] w-[clamp(9.58px,1.635vw+3.45px,27px)] rounded-full bg-gradient-to-br from-[#c7f2cb] to-[#8ddcdc] shadow-[0px_6px_4px_0px_rgba(154,227,203,0.24)]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
        <m.span
          className="absolute top-[172px] left-[clamp(292.32px,73.256vw+17.61px,1072.5px)] flex h-[clamp(29.55px,4.106vw+14.15px,73.28px)] w-[clamp(29.55px,4.106vw+14.15px,73.28px)] items-center justify-center rounded-[clamp(8px,0.845vw+4.83px,17px)] bg-orange-500 shadow-[0px_10px_4px_0px_rgba(255,158,89,0.42)] md:top-[341px] lg:top-[clamp(223px,-33.146vw+680.42px,341px)] lg:shadow-[0px_23px_8.65px_0px_rgba(255,158,89,0.42)]"
          animate={{ rotate: [10, 20, 10] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        >
          <CheckboxIcon className="h-[clamp(34.14px,3.407vw+21.36px,70.43px)] w-[clamp(28.38px,3.585vw+14.94px,66.56px)]" />
        </m.span>
        <m.div
          className="flex flex-col items-center gap-10 md:gap-[48px] lg:gap-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={titleContainerVariants}
        >
          <div className={headingContainerVariants({ align: "center" })}>
            <m.p
              variants={titleItemVariants}
              className={sectionHeadingSubtitleClassName}
            >
              슬리드투두 하나로 정리부터 실행까지
            </m.p>
            <m.h2
              className={titleVariants({ align: "center", multiline: false })}
            >
              {renderAnimatedWords("오늘의 할 일, 슬리드 투두로 계획해요")}
            </m.h2>
          </div>

          <m.div variants={titleItemVariants}>
            <CtaButton />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
