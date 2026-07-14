"use client";

import Popup from "@/components/common/Modal/Popup";
import LinkModal from "@/components/common/Modal/LinkModal";
import PluginModal from "@/components/common/Modal/PluginModal/PluginModal";
import SettingModal from "@/components/common/Modal/SettingModal/SettingModal";

export default function Home() {
  return (
    <div className="flex flex-col gap-2.5 md:gap-3">
      <Popup onDelete={() => {}} />
      <LinkModal onConfirm={() => {}} />
      <PluginModal onConfirm={() => {}} />
      <SettingModal onConfirm={() => {}} />
    </div>
  );
}
