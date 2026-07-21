import Image from "next/image";

export default function NewGoalButton() {
  return (
    <div className="flex w-full items-center justify-center gap-1 text-white py-3 flex-1 bg-orange-500 rounded-full md:aspect-square md:rounded-4xl md:flex-col hover:bg-orange-600">
      <Image
        src="/icons/sidemenu/new_goals.svg"
        alt="new_goals"
        className="md:w-10 md:h-10"
        width={24}
        height={24}
      />
      <span className="font-semibold md:text-lg">새 목표</span>
    </div>
  );
}
