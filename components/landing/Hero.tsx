"use client";

import Image from "next/image";
import { m } from "motion/react";
import { CtaButton } from "@/components/landing/CtaButton";
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
import dashboardImage from "@/public/images/landing/dashboard.png";

export function Hero() {
  return (
    <section className="flex w-full flex-col items-center gap-19.25 bg-[linear-gradient(220.48deg,_#fff9e6_20.84%,_#d4fffe_93.31%)] px-5 pt-20 md:gap-17.5 md:pt-28 lg:gap-18.75 lg:pt-36.5 ">
      <m.div
        className="flex flex-col items-center gap-10 text-center md:gap-12 lg:gap-14"
        initial="hidden"
        animate="visible"
        variants={titleContainerVariants}
      >
        <div className={headingContainerVariants({ align: "center" })}>
          <m.p
            variants={titleItemVariants}
            className={sectionHeadingSubtitleClassName}
          >
            슬리드투두 하나로 정리부터 실행까지
          </m.p>
          <m.h1
            className={titleVariants({ align: "center", multiline: false })}
          >
            {renderAnimatedWords("오늘의 할 일, 슬리드 투두로 계획해요")}
          </m.h1>
        </div>

        <m.div variants={titleItemVariants}>
          <CtaButton />
        </m.div>
      </m.div>

      <m.div
        className="w-full lg:max-w-329.25"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
      >
        <Image
          src={dashboardImage}
          alt="슬리드투두 대시보드 미리보기"
          width={1317}
          height={641}
          preload
          fetchPriority="high"
          placeholder="blur"
          sizes="(min-width: 1024px) 1317px, 100vw"
          className="h-auto w-full"
        />
      </m.div>
    </section>
  );
}
