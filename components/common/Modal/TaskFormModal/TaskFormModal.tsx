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
import { PostTeamIdTodosBody } from "@/apis/model";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostTodos } from "@/hooks/queries/todos/todos.bff.hook";
import { useState } from "react";

export interface TaskFormValues {
  title: string;
  goalId: number;
  dueDate: string;
  linkUrl: string;
  tags: string[];
  fileUrl: string;
}

interface TaskFormModalProps {
  children: React.ReactNode;
  isModify?: boolean;
  defaultValues?: TaskFormValues;
}

const zodSchema = z.object({
  title: z.string().min(1),
  goalId: z.number().optional(),
  dueDate: z.string().optional(),
  linkUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  fileUrl: z.string().optional(),
});

const getOptionalString = (value: string | undefined) => {
  return value ? value : undefined;
};

export default function TaskFormModal({
  children,
  isModify = false,
  defaultValues,
}: TaskFormModalProps) {
  const [open, setOpen] = useState(false);
  const { mutate: postTodos } = usePostTodos();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<PostTeamIdTodosBody>({
    resolver: zodResolver(zodSchema),
    mode: "onChange",
    defaultValues: defaultValues ?? {
      title: "",
      goalId: undefined,
      dueDate: undefined,
      linkUrl: undefined,
      tags: [],
      fileUrl: undefined,
    },
  });

  const onSubmit = (values: PostTeamIdTodosBody) => {
    const dueDate = getOptionalString(values.dueDate);
    const payload = {
      ...values,
      fileUrl: getOptionalString(values.fileUrl),
      linkUrl: getOptionalString(values.linkUrl),
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    };
    postTodos(
      { data: payload },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle showCloseButton={true}>
            {isModify ? "할 일 수정" : "할 일 생성"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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
