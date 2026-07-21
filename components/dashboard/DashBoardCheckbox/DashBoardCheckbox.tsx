"use client";

import CheckboxBasic from "@/components/common/CheckboxBasic";
import { cn } from "@/utils/cn";
import { useForm } from "react-hook-form";

interface DashboardCheckboxValues {
  checked: string;
}

export default function DashboardCheckbox({
  checked = false,
  label,
  labelClassName,
}: {
  checked?: boolean;
  label: string;
  labelClassName?: string;
}) {
  const { control } = useForm<DashboardCheckboxValues>({
    defaultValues: {
      checked: checked ? "checked" : "",
    },
  });

  return (
    <CheckboxBasic
      control={control}
      name="checked"
      value="checked"
      label={label}
      className="min-w-0"
      labelClassName={cn("min-w-0 truncate text-base", labelClassName)}
      disabled
    />
  );
}
