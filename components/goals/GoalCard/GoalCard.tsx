import {
  useDeleteGoal,
  useGetGoal,
} from "@/hooks/queries/goals/goals.bff.hook";
import KebabButton from "@/components/common/KebabButton/KebabButton";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const GoalsModal = dynamic(
  () => import("@/components/common/Modal/GoalsModal/GoalsModal"),
  {
    ssr: false,
    loading: () => null,
  },
);

const Popup = dynamic(() => import("@/components/common/Modal/Popup"), {
  ssr: false,
  loading: () => null,
});

export default function GoalCard({ goalId }: { goalId: number }) {
  const { data: goal } = useGetGoal(goalId);
  const { mutate: deleteGoal } = useDeleteGoal();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    setModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteGoal({ goalId });
    setDeleteModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between rounded-[16px] bg-white dark:bg-card p-4 md:p-6 md:text-xl md:rounded-[24px] lg:text-2xl lg:gap-4 lg:rounded-[32px] lg:px-10 lg:py-15 w-full">
      <div className="flex items-center gap-3">
        <Image
          className="lg:size-10"
          src="/icons/dashboard/goal.svg"
          alt="goal"
          width={32}
          height={32}
          fetchPriority="low"
          loading="lazy"
        />
        <div className="truncate font-semibold text-gray-700 dark:text-foreground lg:text-2xl">
          {goal?.data.title}
        </div>
      </div>
      <KebabButton variant="goal" onEdit={handleEdit} onDelete={handleDelete} />
      {modalOpen && (
        <GoalsModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          defaultValues={{
            title: goal?.data.title ?? "",
            id: goalId,
          }}
        />
      )}
      {deleteModalOpen && (
        <Popup
          onDelete={handleDeleteConfirm}
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
        />
      )}
    </div>
  );
}
