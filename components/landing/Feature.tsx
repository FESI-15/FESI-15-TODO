import Image from "next/image";
import previewImage from "@/public/images/landing/preview.png";
import taskIcon from "@/public/images/landing/img_task.png";
import progressIcon from "@/public/images/landing/img_progress.png";
import noteIcon from "@/public/images/landing/img_note.png";

const FEATURES = [
  { icon: taskIcon, label: "스마트한 할 일 관리" },
  { icon: progressIcon, label: "진행 상황 시각화" },
  { icon: noteIcon, label: "편리한 학습 노트" },
];

export function Feature() {
  return (
    <section className="flex w-full flex-col items-center gap-11.5 bg-orange-500 px-7 py-11 md:gap-13.5 md:px-5.5 md:py-20.25 lg:flex-row lg:items-start lg:justify-center lg:gap-54 lg:px-75.5 lg:py-39.25">
      <div className="flex flex-col gap-11 self-start text-left lg:w-118.5 lg:shrink-0">
        <div className="flex flex-col gap-1 md:gap-3 lg:gap-4.5">
          <p className="text-base leading-6 font-semibold tracking-[-0.03em] text-orange-300 md:text-2xl md:leading-8 lg:text-[30px] lg:leading-9">
            더 똑똑한 할 일 관리
          </p>
          <p className="text-xl leading-7.5 font-bold tracking-[-0.03em] text-white md:text-4xl md:leading-11 lg:text-5xl lg:leading-13">
            슬리드 투두가 특별한 이유
          </p>
        </div>
        <ul className="flex flex-col gap-4 lg:gap-6">
          {FEATURES.map(({ icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 md:gap-3 lg:gap-4"
            >
              <Image src={icon} alt="" className="h-8 w-8 md:h-10 md:w-10" />
              <span className="text-base leading-6 font-bold tracking-[-0.03em] text-white md:text-xl md:leading-7.5">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Image
        src={previewImage}
        alt="슬리드투두 진행 관리 미리보기"
        className="h-auto w-full max-w-88.75 md:max-w-174.5"
      />
    </section>
  );
}
