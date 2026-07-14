"use client";

import Popup from "@/components/common/Modal/Popup";
import LinkModal from "@/components/common/Modal/LinkModal";
import PluginModal from "@/components/common/Modal/PluginModal/PluginModal";

export default function Home() {
  return (
    <div>
      <Popup onDelete={() => {}} />
      <LinkModal onConfirm={() => {}} />
      <PluginModal onConfirm={() => {}} />
    </div>
  );
}
