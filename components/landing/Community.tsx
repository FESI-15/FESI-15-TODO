"use client";

import { m } from "motion/react";
import CommunityDecoration from "@/public/icons/landing/communityDecoration.svg";
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

const COMMUNITY_TITLE_LINES = ["다양한 사람들과", "서로의 목표를 응원해요"];

export function Community() {
  return (
    <section className="flex w-full justify-center overflow-hidden bg-white px-10 py-15 md:px-20 md:pt-20 md:pb-16.25 lg:px-15 lg:py-24">
      <div className="flex w-full max-w-[1300px] flex-col-reverse items-center gap-16 md:gap-20 lg:flex-row lg:items-center lg:justify-between">
        <m.div
          className="relative aspect-[771/530] w-full  lg:max-w-none lg:min-w-0 lg:flex-1"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <CommunityDecoration className="absolute inset-0 h-full w-full" />
        </m.div>

        <div className="self-end lg:shrink-0 lg:self-auto">
          <m.div
            className={headingContainerVariants({ align: "right" })}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={titleContainerVariants}
          >
            <m.p
              variants={titleItemVariants}
              className={sectionHeadingSubtitleClassName}
            >
              활발한 소통 게시판
            </m.p>
            <m.h2
              className={titleVariants({ align: "right", multiline: true })}
            >
              {COMMUNITY_TITLE_LINES.map((line, lineIndex) => (
                <span
                  key={line}
                  className="flex flex-wrap justify-end gap-x-1.5"
                >
                  {renderAnimatedWords(line, `${lineIndex}-`)}
                </span>
              ))}
            </m.h2>
          </m.div>
        </div>
      </div>
    </section>
  );
}
