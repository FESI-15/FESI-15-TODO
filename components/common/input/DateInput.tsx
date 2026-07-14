"use client";

import { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ko } from "date-fns/locale";
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
  dateInputTriggerVariants,
  dateInputIconVariants,
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
    const [isOpen, setIsOpen] = useState(false);

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
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger
            ref={ref}
            id={id}
            className={dateInputTriggerVariants({
              size: inputSize,
              hasValue: Boolean(date),
              isOpen,
            })}
          >
            <CalendarIcon
              className={dateInputIconVariants({ size: inputSize })}
            />
            {formattedDate ?? placeholder}
          </PopoverTrigger>
          <PopoverContent className="w-auto px-6 py-5" align="start">
            <div className="[--cell-radius:9999px] [--cell-size:40px] [--primary-foreground:white] [--primary:var(--color-orange-500)]">
              <Calendar
                mode="single"
                selected={date}
                onSelect={onDateChange}
                locale={ko}
                classNames={{
                  day: "[&>button]:rounded-full",
                  today: "[&>button]:rounded-full",
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
      </Field>
    );
  },
);

DateInput.displayName = "DateInput";
