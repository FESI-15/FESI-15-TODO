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
import {
  usePatchTodo,
  usePostTodos,
} from "@/hooks/queries/todos/todos.bff.hook";
import { useState } from "react";

export interface TaskFormValues {
  title: string;
  goalId: number | undefined;
  dueDate: string;
  linkUrl: string;
  tags: string[];
  fileUrl: string;
}

interface BaseTaskFormModalProps {
  children?: React.ReactNode;
  defaultValues?: TaskFormValues;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface CreateTaskFormModalProps extends BaseTaskFormModalProps {
  isModify?: false;
  todoId?: never;
}

interface ModifyTaskFormModalProps extends BaseTaskFormModalProps {
  isModify: true;
  todoId: number;
}

type TaskFormModalProps = CreateTaskFormModalProps | ModifyTaskFormModalProps;

const zodSchema = z.object({
  title: z.string().min(1, "할 일 제목을 입력해주세요."),
  goalId: z.number().optional(),
  dueDate: z.string().optional(),
  linkUrl: z.union([
    z.url("http 또는 https 링크를 입력해주세요.").optional(),
    z.literal(""),
  ]),
  tags: z.array(z.string()).optional(),
  fileUrl: z.string().optional(),
});

const getOptionalString = (value: string | undefined) => {
  return value ? value : undefined;
};

export default function TaskFormModal(props: TaskFormModalProps) {
  const { children, defaultValues, open, onOpenChange } = props;
  const isModify = props.isModify ?? false;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const { mutate: postTodos } = usePostTodos();
  const { mutate: patchTodo } = usePatchTodo();
  const {
    control,
    handleSubmit,
    reset,
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

  const handleOpenChange = (nextOpen: boolean) => {
    if (open === undefined) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  };

  const onSubmit = (values: PostTeamIdTodosBody) => {
    const dueDate = getOptionalString(values.dueDate);
    const payload = {
      ...values,
      fileUrl: getOptionalString(values.fileUrl),
      linkUrl: getOptionalString(values.linkUrl),
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    };
    if (props.isModify) {
      patchTodo(
        { todoId: props.todoId, data: payload },
        {
          onSuccess: () => {
            handleOpenChange(false);
          },
        },
      );
    } else {
      postTodos(
        { data: payload },
        {
          onSuccess: () => {
            reset();
            handleOpenChange(false);
          },
        },
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
