"use client";

import dynamic from "next/dynamic";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../../Button";
import DarkModeToggleButtonContainer from "./DarkModeToggleButton/DarkModeToggleButtonContainer";

interface SettingModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export default function SettingModal({
  open,
  onConfirm,
  onClose,
}: SettingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle showCloseButton={true}>설정</DialogTitle>
        </DialogHeader>
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
