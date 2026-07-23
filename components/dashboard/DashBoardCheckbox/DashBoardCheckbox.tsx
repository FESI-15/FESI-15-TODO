"use client";

import CheckboxBasic from "@/components/common/CheckboxBasic";
import { usePatchTodo } from "@/hooks/queries/todos/todos.bff.hook";
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
      patchTodo({ todoId: taskId, data: { done: true } });
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
