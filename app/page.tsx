"use client";

import Popup from "@/components/common/Modal/Popup";
import LinkModal from "@/components/common/Modal/LinkModal";
import PluginModal from "@/components/common/Modal/PluginModal/PluginModal";
import SettingModal from "@/components/common/Modal/SettingModal/SettingModal";
import TaskModal from "@/components/common/Modal/TaskModal/TaskModal";
import Chips from "@/components/common/Chips";
import CheckboxBasic from "@/components/common/CheckboxBasic";
import { useState } from "react";

export default function Home() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-2.5 md:gap-3">
      <Popup onDelete={() => {}} />
      <LinkModal onConfirm={() => {}} />
      <PluginModal onConfirm={() => {}} />
      <SettingModal onConfirm={() => {}} />
      <TaskModal />
      <Chips variant="to do" />
      <Chips variant="done" />
      <CheckboxBasic
        label="Accept terms and conditions"
        checked={checked}
        onChange={setChecked}
      />
    </div>
  );
}
