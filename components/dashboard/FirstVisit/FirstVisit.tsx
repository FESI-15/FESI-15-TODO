"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const GoalsModal = dynamic(
  () => import("@/components/common/Modal/GoalsModal/GoalsModal"),
  {
    ssr: false,
  },
);

const FirstVisitModal = dynamic(
  () => import("@/components/common/Modal/FirstVisitModal/FirstVisitModal"),
  {
    ssr: false,
  },
);

export default function FirstVisit() {
  const [open, setOpen] = useState(false);

  const handleGoalModalOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <FirstVisitModal handleGoalModalOpen={handleGoalModalOpen} />
      {open && <GoalsModal open={open} onOpenChange={setOpen} />}
    </>
  );
}
