"use client";

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
import { Button } from "../../Button";

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
  return (
    <Dialog>
      <DialogTrigger render={trigger} />
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
