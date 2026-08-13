import { m } from "motion/react";

interface GraphProps {
  className: string;
  value: number;
}
const clampProgress = (value: number) => {
  return Math.min(Math.max(value, 0), 1);
};

export default function Graph({ className, value }: GraphProps) {
  return (
    <svg className={className} viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        className="stroke-black/15 dark:stroke-white/15"
        strokeWidth="16"
      />
      <m.circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        className="stroke-white dark:stroke-[#56ffff]"
        strokeWidth="16"
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: clampProgress(value), opacity: 1 }}
        transition={{
          pathLength: { ease: "easeOut", duration: 1 },
          opacity: { duration: 0.01 },
        }}
      />
    </svg>
  );
}
