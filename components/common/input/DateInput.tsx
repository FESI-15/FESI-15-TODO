"use client";

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import CalendarIcon from "@/public/icons/input/calendar.svg";
import {
  dateInputFieldVariants,
  dateInputIconVariants,
  dateInputTriggerVariants,
  inputLabelClassName,
} from "./Input.variants";

type InputSize = "desktop" | "mobile";

interface DateInputProps {
  inputSize?: InputSize;
  fieldClassName?: string;
  label?: string;
  id?: string;
  placeholder?: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export const DateInput = forwardRef<HTMLButtonElement, DateInputProps>(
  (
    {
      inputSize = "desktop",
      fieldClassName,
      label,
      id,
      placeholder = "날짜를 선택해주세요",
      date,
      onDateChange,
    },
    ref,
  ) => {
    const formattedDate = date
      ? `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}`
      : null;

    return (
      <Field
        className={twMerge(
          dateInputFieldVariants({ size: inputSize }),
          fieldClassName,
        )}
      >
        {label && (
          <FieldLabel htmlFor={id} className={inputLabelClassName}>
            {label}
          </FieldLabel>
        )}
        <Popover>
          <PopoverTrigger
            ref={ref}
            id={id}
            className={dateInputTriggerVariants({
              size: inputSize,
              hasValue: Boolean(date),
            })}
          >
            <CalendarIcon
              className={dateInputIconVariants({ size: inputSize })}
            />
            {formattedDate ?? placeholder}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={onDateChange} />
          </PopoverContent>
        </Popover>
      </Field>
    );
  },
);

DateInput.displayName = "DateInput";
