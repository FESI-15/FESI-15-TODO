import Image from "next/image";

export default function NewGoalButton() {
  return (
    <div className="flex w-full lg:w-[120px] items-center justify-center gap-1 text-white py-3 flex-1 bg-orange-500 rounded-full lg:aspect-square lg:rounded-4xl lg:flex-col hover:bg-orange-600">
      <Image
        src="/icons/sidemenu/new_goals.svg"
        alt="new_goals"
        className="lg:w-10 lg:h-10"
        width={24}
        height={24}
      />
      <span className="font-semibold md:text-lg">새 목표</span>
    </div>
  );
}
