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
import { TextInput } from "../input/TextInput";
import { Button } from "../Button";
import { useForm } from "react-hook-form";

interface LinkModalProps {
  onConfirm: () => void;
}

interface LinkFormValues {
  link: string;
}

export default function LinkModal({ onConfirm }: LinkModalProps) {
  const form = useForm<LinkFormValues>({
    defaultValues: {
      link: "",
    },
  });

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle showCloseButton={true}>링크 업로드</DialogTitle>
        </DialogHeader>
        <div className="mt-6 md:mt-8">
          <TextInput
            control={form.control}
            name="link"
            fieldClassName="w-full"
            placeholder="링크를 입력해주세요"
          />
        </div>
        <DialogFooter>
          <div className="flex gap-2 w-full mt-4 md:mt-6">
            <DialogClose
              render={
                <Button
                  fullWidth
                  hierarchy="primary"
                  size="lg"
                  onClick={onConfirm}
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
