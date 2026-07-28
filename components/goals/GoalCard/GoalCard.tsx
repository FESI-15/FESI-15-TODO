import { useGetGoal } from "@/hooks/queries/goals/goals.bff.hook";
import KebabButton from "@/components/common/KebabButton/KebabButton";
import { useState } from "react";
import GoalsModal from "@/components/common/Modal/GoalsModal/GoalsModal";
import Image from "next/image";

export default function GoalCard({ goalId }: { goalId: number }) {
  const { data: goal } = useGetGoal(goalId);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = () => {
    setModalOpen(true);
  };

  return (
    <div className="p-4 bg-white rounded-[16px] flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src="/icons/dashboard/goal.svg"
          alt="goal"
          width={32}
          height={32}
        />
        <div className="font-semibold text-gray-700">{goal?.data.title}</div>
      </div>
      <KebabButton variant="goal" onEdit={handleEdit} onDelete={() => {}} />
      {modalOpen && <GoalsModal open={modalOpen} onOpenChange={setModalOpen} />}
    </div>
  );
}
