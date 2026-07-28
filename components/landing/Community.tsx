import { SectionHeading } from "@/components/landing/SectionHeading";
import CommunityDecoration from "@/public/icons/landing/communityDecoration.svg";

export function Community() {
  return (
    <section className="flex w-full justify-center overflow-hidden bg-white px-10 py-15 md:px-20 md:pt-20 md:pb-16.25 lg:px-15 lg:py-24">
      <div className="flex w-full max-w-[1300px] flex-col-reverse items-center gap-16 md:gap-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative aspect-[771/530] w-full  lg:max-w-none lg:min-w-0 lg:flex-1">
          <CommunityDecoration className="absolute inset-0 h-full w-full" />
        </div>

        <div className="self-end lg:shrink-0 lg:self-auto">
          <SectionHeading
            align="right"
            subtitle="활발한 소통 게시판"
            title={["다양한 사람들과", "서로의 목표를 응원해요"]}
          />
        </div>
      </div>
    </section>
  );
}
