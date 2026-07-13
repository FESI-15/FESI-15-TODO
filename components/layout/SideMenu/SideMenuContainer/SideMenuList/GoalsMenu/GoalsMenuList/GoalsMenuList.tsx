import Link from "next/link";
import * as m from "motion/react-m";

interface GoalsMenuListProps {
  goalLists: {
    id: number;
    name: string;
  }[];
}

export default function GoalsMenuList({ goalLists }: GoalsMenuListProps) {
  return (
    <ul className="flex flex-col mt-2">
      {goalLists.map((goalList, index) => (
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
            <span className="text-sm font-semibold">{goalList.name}</span>
          </Link>
        </m.li>
      ))}
    </ul>
  );
}
