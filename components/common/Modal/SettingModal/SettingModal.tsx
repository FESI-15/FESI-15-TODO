import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import LanguageSelect from "./LanguageSelect/LanguageSelect";
import DarkModeToggleButton from "./DarkModeToggleButton/DarkModeToggleButton";
import { useState } from "react";

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
                <button
                  type="button"
                  className="flex-1 py-2.5 rounded-full bg-primary text-white md:py-3.5"
                >
                  취소
                </button>
              }
            />
            <button
              onClick={onConfirm}
              type="button"
              className="flex-1 py-2.5 rounded-full bg-primary text-white md:py-3.5"
            >
              확인
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
