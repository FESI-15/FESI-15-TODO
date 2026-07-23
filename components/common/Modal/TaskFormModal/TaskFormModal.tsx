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
  image: File | null;
}

interface TaskFormModalProps {
  children: React.ReactNode;
  isModify?: boolean;
}
export default function TaskFormModal({
  children,
  isModify = false,
}: TaskFormModalProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<TaskFormValues>({
    mode: "onChange",
    defaultValues: {
      status: "to do",
      title: "",
      deadline: undefined,
      link: "",
      tags: [],
      image: null,
    },
  });

  const onCreate = (values: TaskFormValues) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle showCloseButton={true}>
            {isModify ? "할 일 수정" : "할 일 생성"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onCreate)}>
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
                type="submit"
                fullWidth
                hierarchy="primary"
                size="lg"
                disabled={!isValid}
              >
                확인
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
