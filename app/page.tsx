"use client";

import Popup from "@/components/common/Modal/Popup";
import LinkModal from "@/components/common/Modal/LinkModal";

export default function Home() {
  return (
    <div>
      <Popup onDelete={() => {}} />
      <LinkModal onConfirm={() => {}} />
    </div>
  );
}
