"use client";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "../../Button";
import { useState } from "react";
import Image from "next/image";
import { cva } from "class-variance-authority";

const STEP_IMAGES = [
  {
    icon: "/icons/modal/goal.svg",
    title: "목표 설정",
    bgColor: "#FFE5B7",
    textBgColor: "#EF6C00",
    description1: "이루고 싶은 목표를",
    description2: "먼저 만들어보세요.",
  },
  {
    icon: "/icons/modal/todo.svg",
    title: "할 일 만들기",
    bgColor: "#C7F2EB",
    textBgColor: "#01D4BE",
    description1: "목표를 이루기 위한",
    description2: "할 일을 추가해보세요.",
  },
  {
    icon: "/icons/modal/connect.svg",
    title: "목표에 연결하기",
    bgColor: "#EEF4FC",
    textBgColor: "#70A5F9",
    description1: "만든 할 일을 목표에",
    description2: "연결하고 관리하세요.",
  },
];

const bgColorVariants = cva(
  "md:size-[150px] size-[100px] md:rounded-[24px] rounded-[16px] flex relative items-center justify-center",
  {
    variants: {
      bgColor: {
        "#FFE5B7": "bg-[#FFE5B7]",
        "#C7F2EB": "bg-[#C7F2EB]",
        "#EEF4FC": "bg-[#EEF4FC]",
      },
    },
    defaultVariants: {
      bgColor: "#FFE5B7",
    },
  },
);

const textBgColorVariants = cva(
  "text-white md:text-lg text-sm font-medium md:size-[30px] size-[20px] rounded-full flex items-center justify-center absolute md:top-3 top-2 md:left-3 left-2",
  {
    variants: {
      textBgColor: {
        "#EF6C00": "bg-[#EF6C00]",
        "#01D4BE": "bg-[#01D4BE]",
        "#70A5F9": "bg-[#70A5F9]",
      },
    },
    defaultVariants: {
      textBgColor: "#EF6C00",
    },
  },
);

interface FirstVisitModalProps {
  handleGoalModalOpen: () => void;
}

export default function FirstVisitModal({
  handleGoalModalOpen,
}: FirstVisitModalProps) {
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem("isFirstLoggedIn") !== "false";
  });

  const handleClose = () => {
    localStorage.setItem("isFirstLoggedIn", "false");
    setOpen(false);
  };

  const handleStart = () => {
    setOpen(false);
    localStorage.setItem("isFirstLoggedIn", "false");
    handleGoalModalOpen();
  };

  if (!open) return null;
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] w-full lg:p-12">
        <div className="max-h-[500px] overflow-y-auto overflow-x-hidden md:max-h-none md:overflow-hidden">
          <div>
            <h2 className="text-base font-bold md:text-[32px] text-center">
              슬리드 투두에 오신 것을 환영합니다!
            </h2>
            <p className="text-center text-gray-500 text-sm mt-2 md:text-xl md:mt-6">
              목표를 만들고 할 일을 추가해보세요.
              <br />더 체계적으로 목표를 달성할 수 있어요.
            </p>
          </div>
          <div className="md:mt-10 mt-6 flex flex-col md:flex-row gap-4 md:gap-15 justify-center">
            {STEP_IMAGES.map((step, index) => (
              <div
                className="flex flex-col items-center justify-center"
                key={index}
              >
                <div
                  key={index}
                  className={bgColorVariants({
                    bgColor: step.bgColor as "#FFE5B7" | "#C7F2EB" | "#EEF4FC",
                  })}
                >
                  <p
                    className={textBgColorVariants({
                      textBgColor: step.textBgColor as
                        "#EF6C00" | "#01D4BE" | "#70A5F9",
                    })}
                  >
                    {index + 1}
                  </p>
                  <Image
                    className="md:size-[120px] size-[80px]"
                    src={step.icon}
                    alt="step-1"
                    width={120}
                    height={120}
                  />
                </div>
                <h3 className="md:text-xl text-base font-semibold text-center md:mt-3 mt-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-center md:text-lg text-sm md:mt-1 mt-0.5">
                  {step.description1}
                  <br />
                  {step.description2}
                </p>
              </div>
            ))}
          </div>
          <DialogFooter className="md:mt-12 mt-7">
            <div className="flex gap-2 w-full md:w-[400px] mx-auto">
              <Button
                onClick={handleStart}
                fullWidth
                hierarchy="primary"
                size="lg"
              >
                시작하기
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
