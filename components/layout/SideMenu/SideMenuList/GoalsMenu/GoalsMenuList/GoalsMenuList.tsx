import Link from "next/link";

export default function GoalsMenuList({ goalLists }: { goalLists: any }) {
  return (
    <ul className="flex flex-col mt-2 border-b-2 border-orange-500">
      {goalLists.map((goalList: any) => (
        <li key={goalList.id}>
          <Link
            href={`/goals/${goalList.id}`}
            className="py-2 px-6 block hover:bg-orange-200 hover:text-orange-700 text-gray-700"
          >
            <span className="text-sm font-semibold">{goalList.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
