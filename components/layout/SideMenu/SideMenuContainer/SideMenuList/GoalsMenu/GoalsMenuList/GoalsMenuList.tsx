import Link from "next/link";
import { m } from "motion/react";
import { GetTeamIdGoals200GoalsItem } from "@/apis/model";

export default function GoalsMenuList({
  goals,
  onClose,
}: {
  goals: GetTeamIdGoals200GoalsItem[];
  onClose?: () => void;
}) {
  return (
    <ul className="flex flex-col">
      {goals.map((goalList, index) => (
        <m.li
          key={goalList.id}
          className="last:border-b-2 border-orange-500 lg:last:border-b-0"
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: index * 0.1,
          }}
        >
          <Link
            href={`/goals/${goalList.id}`}
            onClick={() => onClose?.()}
            className="py-2 px-6 block lg:py-4 lg:w-[200px] hover:bg-orange-200 hover:text-orange-700 text-gray-700 dark:text-foreground dark:hover:bg-orange-500/10"
          >
            <span className="line-clamp-1 text-sm font-semibold">
              {goalList.title}
            </span>
          </Link>
        </m.li>
      ))}
    </ul>
  );
}
