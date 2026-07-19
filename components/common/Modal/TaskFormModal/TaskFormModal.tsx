"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "./Form/Form";
import { Button } from "../../Button";

export interface TaskFormValues {
  title: string;
  deadline: Date | undefined;
  link: string;
}

export default function TaskFormModal() {
  const [status, setStatus] = useState("to do");
  const form = useForm<TaskFormValues>({
    defaultValues: {
      title: "",
      deadline: undefined,
      link: "",
    },
  });

  const onCreate = (values: TaskFormValues) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle showCloseButton={true}>할 일 생성</DialogTitle>
        </DialogHeader>
        <Form control={form.control} status={status} onChange={setStatus} />
        <DialogFooter>
          <div className="flex gap-2 w-full mt-4 md:mt-10">
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
            <Button
              fullWidth
              hierarchy="primary"
              size="lg"
              onClick={form.handleSubmit(onCreate)}
            >
              확인
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
