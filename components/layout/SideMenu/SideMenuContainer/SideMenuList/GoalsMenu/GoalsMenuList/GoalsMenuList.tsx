import Link from "next/link";
import * as m from "motion/react-m";
import { useGetGoals } from "@/hooks/queries/goals/goals.bff.hook";

export default function GoalsMenuList() {
  const { data: goals } = useGetGoals();
  if (goals?.data.goals.length === 0) return null;
  return (
    <ul className="flex flex-col mt-2">
      {goals?.data.goals.map((goalList, index) => (
        <m.li
          key={goalList.id}
          className="last:border-b-2 border-orange-500"
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
            className="py-2 px-6 block hover:bg-orange-200 hover:text-orange-700 text-gray-700"
          >
            <span className="text-sm font-semibold">{goalList.title}</span>
          </Link>
        </m.li>
      ))}
    </ul>
  );
}
