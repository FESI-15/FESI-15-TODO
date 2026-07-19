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
import { useForm } from "react-hook-form";
import Form from "./Form/Form";
import { Button } from "../../Button";

export interface TaskFormValues {
  status: "to do" | "done";
  title: string;
  deadline: Date | undefined;
  link: string;
  tags: string[];
}

export default function TaskFormModal() {
  const { control, handleSubmit } = useForm<TaskFormValues>({
    mode: "onChange",
    defaultValues: {
      status: "to do",
      title: "",
      deadline: undefined,
      link: "",
      tags: [],
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
        <Form control={control} />
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
              onClick={handleSubmit(onCreate)}
            >
              확인
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
