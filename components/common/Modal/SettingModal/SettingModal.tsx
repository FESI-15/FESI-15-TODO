"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LanguageSelect from "./LanguageSelect/LanguageSelect";
import DarkModeToggleButton from "./DarkModeToggleButton/DarkModeToggleButton";
import { useState } from "react";
import { Button } from "../../Button";

interface SettingModalProps {
  onConfirm: () => void;
}

export default function SettingModal({ onConfirm }: SettingModalProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle showCloseButton={true}>설정</DialogTitle>
        </DialogHeader>
        <LanguageSelect />
        <DarkModeToggleButton
          isDarkMode={isDarkMode}
          onToggle={setIsDarkMode}
        />
        <DialogFooter>
          <div className="flex gap-2 w-full mt-10">
            <DialogClose
              render={
                <Button
                  className="text-gray-500"
                  fullWidth
                  hierarchy="tertiary"
                  size="lg"
                >
                  취소
                </Button>
              }
            />
            <Button fullWidth onClick={onConfirm} hierarchy="primary" size="lg">
              확인
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
