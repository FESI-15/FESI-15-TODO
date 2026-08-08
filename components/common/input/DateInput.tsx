"use client";

/* eslint-disable react-hooks/refs -- RHF field.value is form state, but this rule treats it like a React ref. */

import { useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import CalendarIcon from "@/public/icons/input/calendar.svg";
import {
  dateInputTriggerVariants,
  inputLabelClassName,
} from "./Input.variants";
import { format } from "date-fns";

interface DateInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  id?: string;
  placeholder?: string;
}

export function DateInput<T extends FieldValues>({
  control,
  name,
  label,
  id,
  placeholder = "날짜를 선택해주세요",
}: DateInputProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState<Date | undefined>();
  const inputId = id ?? name;
  const { field, fieldState } = useController({
    control,
    name,
  });
  const date = field.value ? new Date(field.value) : undefined;
  const isError = Boolean(fieldState.error);
  const formattedDate = date ? format(date, "yyyy.MM.dd") : null;

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setCalendarMonth(date ?? new Date());
    }

    setIsOpen(open);
  };

  return (
    <Field data-invalid={isError}>
      {label && (
        <FieldLabel htmlFor={inputId} className={inputLabelClassName}>
          {label}
        </FieldLabel>
      )}
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger
          ref={field.ref}
          id={inputId}
          className={dateInputTriggerVariants({
            hasValue: Boolean(date),
          })}
        >
          <CalendarIcon className="h-5 w-5 shrink-0 text-gray-500 dark:text-muted-foreground md:h-6 md:w-6" />
          {formattedDate ?? placeholder}
        </PopoverTrigger>
        <PopoverContent className="w-auto px-6 py-5" align="start">
          <div className="[--cell-radius:9999px] [--cell-size:40px] [--primary-foreground:white] [--primary:var(--color-orange-500)]">
            <Calendar
              mode="single"
              month={calendarMonth}
              onMonthChange={setCalendarMonth}
              selected={date}
              onSelect={(selectedDate) => {
                field.onChange(
                  selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined,
                );
                setIsOpen(false);
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
      {isError && fieldState.error?.message && (
        <FieldError className="ml-1 text-sm font-medium text-red-500">
          {fieldState.error.message}
        </FieldError>
      )}
    </Field>
  );
}
