import Graph from "@/components/common/Graph";
import useCountAnimation from "@/hooks/useCountAnimation";
import { m, useAnimationControls } from "motion/react";
import { useEffect, useRef } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { TConductorInstance } from "react-canvas-confetti/dist/types";

interface GoalProgressProps {
  progress: number;
}

export default function GoalProgress({ progress }: GoalProgressProps) {
  const { count } = useCountAnimation(progress);
  const conductorRef = useRef<TConductorInstance | null>(null);
  const controls = useAnimationControls();

  useEffect(() => {
    if (progress !== 100) return;

    const playAnimation = async () => {
      await controls.start({
        scale: 0.8,
        transition: {
          delay: 1,
          duration: 0.15,
        },
      });

      controls.start({
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 10,
        },
      });

      conductorRef.current?.run({
        speed: 1,
        duration: 1500,
      });
    };

    playAnimation();

    return () => {
      conductorRef.current?.stop();
    };
  }, [progress, controls]);
  return (
    <>
      <m.div
        animate={controls}
        className="flex h-[160px] flex-1 shrink-0 items-center gap-6 rounded-[24px] bg-orange-500 p-8 text-white shadow-[0_10px_20px_rgba(255,158,89,0.4)] dark:border dark:border-[#a44d1d] dark:bg-[#572810] dark:shadow-none lg:w-[308px] lg:flex-none lg:rounded-[32px]"
      >
        <Graph className="size-[76px] shrink-0" value={progress / 100} />
        <div className="min-w-0">
          <p className="text-lg font-bold whitespace-nowrap">목표 진행도</p>
          <p className="text-[48px] leading-[52px] font-bold">
            {count}
            <span className="ml-1 text-xl font-medium">%</span>
          </p>
        </div>
      </m.div>
      <Fireworks
        onInit={({ conductor }) => {
          conductorRef.current = conductor;
        }}
      />
    </>
  );
}
