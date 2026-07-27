import Image from "next/image";
import { SectionHeading } from "@/components/landing/SectionHeading";
import stepGoalIcon from "@/public/images/landing/img_step_goal.png";
import stepTodoIcon from "@/public/images/landing/img_step_todo.png";
import stepNoteIcon from "@/public/images/landing/img_step_note.png";

const STEPS = [
  {
    icon: stepGoalIcon,
    title: "목표 설정하기",
    description: "달성하고 싶은 목표를 만들고\n이름을 정하세요",
  },
  {
    icon: stepTodoIcon,
    title: "할 일 추가하기",
    description: "목표에 맞는 할 일을 추가하고\n자료를 첨부하세요",
  },
  {
    icon: stepNoteIcon,
    title: "학습하고 기록하기",
    description: "할 일을 완료하며 학습하고,\n노트로 기록하세요",
  },
];

export function Steps() {
  return (
    <section className="flex w-full flex-col items-center bg-gray-50 px-4 py-11 md:gap-13.5 md:px-6 md:pt-25 md:pb-17.5 lg:px-0 lg:py-30">
      <div className="flex w-full max-w-348 flex-col items-center gap-11 md:gap-18 lg:gap-22">
        <SectionHeading
          subtitle="목표 설정부터 기록까지"
          title="쉽고 빠르게 할 일을 시작해요"
        />
        <ul className="flex w-full flex-col gap-4 md:flex-row lg:gap-8">
          {STEPS.map(({ icon, title, description }, index) => (
            <li
              key={title}
              className="flex flex-1 flex-col items-center gap-6 rounded-3xl bg-white px-6 py-10 shadow-[0px_0px_60px_0px_rgba(0,0,0,0.05)] md:gap-8 md:px-8 md:py-12 lg:gap-6 lg:rounded-[40px] lg:px-12 lg:pt-12 lg:pb-16"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-xl leading-7.5 font-bold text-white shadow-[0px_4px_8px_0px_rgba(255,158,89,0.2)]">
                {index + 1}
              </span>
              <div className="flex flex-col items-center gap-6 md:gap-8">
                <Image
                  src={icon}
                  alt=""
                  className="h-30 w-30 lg:h-45 lg:w-45"
                />
                <div className="flex flex-col items-center gap-3 text-center lg:gap-4">
                  <p className="text-xl leading-7.5 font-semibold tracking-[-0.03em] text-gray-700 lg:text-3xl lg:leading-9 lg:font-bold">
                    {title}
                  </p>
                  <p className="text-base leading-6 font-medium tracking-[-0.03em] whitespace-pre-line text-gray-400 lg:text-xl lg:leading-7.5">
                    {description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
