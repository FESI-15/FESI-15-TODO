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
import { formatDate } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostTodos } from "@/hooks/queries/todos/todos.bff.hook";

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

export default function TaskFormModal({
  children,
  isModify = false,
  defaultValues,
}: TaskFormModalProps) {
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
    const payload = {
      ...values,
      dueDate: values.dueDate
        ? formatDate(new Date(values.dueDate), "yyyy-MM-dd")
        : undefined,
    };
    postTodos({ data: payload });
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
