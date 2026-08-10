"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
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
import { Button } from "../../Button";
import { DEFAULT_LANGUAGE, type LanguageCode } from "@/constants/setting";

const DarkModeToggleButtonContainer = dynamic(
  () => import("./DarkModeToggleButton/DarkModeToggleButtonContainer"),
  { ssr: false },
);

interface SettingModalProps {
  trigger: React.ReactElement;
  onConfirm?: () => void;
}

export default function SettingModal({
  trigger,
  onConfirm,
}: SettingModalProps) {
  const [language, setLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle showCloseButton={true}>설정</DialogTitle>
        </DialogHeader>
        <LanguageSelect value={language} onChange={setLanguage} />
        <DarkModeToggleButtonContainer />
        <DialogFooter>
          <div className="flex gap-2 w-full mt-10">
            <DialogClose
              render={
                <Button
                  className="text-gray-500 dark:text-white"
                  fullWidth
                  hierarchy="tertiary"
                  size="lg"
                >
                  취소
                </Button>
              }
            />
            <DialogClose
              render={
                <Button
                  fullWidth
                  onClick={onConfirm}
                  hierarchy="primary"
                  size="lg"
                >
                  확인
                </Button>
              }
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
