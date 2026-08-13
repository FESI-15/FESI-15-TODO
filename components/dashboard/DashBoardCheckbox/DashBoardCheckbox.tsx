"use client";

import CheckboxBasic from "@/components/common/CheckboxBasic";
import { usePatchTodo } from "@/hooks/queries/todos/todos.bff.hook";
import { showSaveSuccessToast } from "@/utils/toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface DashboardCheckboxValues {
  checked: string;
}

interface DashboardCheckboxProps {
  checked?: boolean;
  taskId: number;
}

export default function DashboardCheckbox({
  checked = false,
  taskId,
}: DashboardCheckboxProps) {
  const taskValue = String(taskId);
  const { mutate: patchTodo } = usePatchTodo();

  const { control, reset } = useForm<DashboardCheckboxValues>({
    defaultValues: {
      checked: checked ? taskValue : "",
    },
  });

  useEffect(() => {
    reset({
      checked: checked ? taskValue : "",
    });
  }, [checked, reset, taskValue]);

  const handleCheckedChange = (isChecked: boolean) => {
    if (isChecked) {
      patchTodo(
        { todoId: taskId, data: { done: true } },
        {
          onSuccess: () => {
            showSaveSuccessToast("할 일을 완료했습니다.");
          },
        },
      );
    } else {
      patchTodo({ todoId: taskId, data: { done: false } });
    }
  };

  return (
    <CheckboxBasic
      control={control}
      name="checked"
      value={taskValue}
      label={""}
      onCheckedChange={handleCheckedChange}
    />
  );
}
