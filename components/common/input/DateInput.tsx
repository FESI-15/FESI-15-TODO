"use client";

import { useState } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { ko } from "date-fns/locale";
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
  const inputId = id ?? name;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const date = field.value as Date | undefined;
        const isError = Boolean(fieldState.error);
        const formattedDate = date
          ? `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}`
          : null;

        return (
          <Field data-invalid={isError}>
            {label && (
              <FieldLabel htmlFor={inputId} className={inputLabelClassName}>
                {label}
              </FieldLabel>
            )}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger
                ref={field.ref}
                id={inputId}
                className={dateInputTriggerVariants({
                  hasValue: Boolean(date),
                })}
              >
                <CalendarIcon className="h-5 w-5 shrink-0 text-gray-500 md:h-6 md:w-6" />
                {formattedDate ?? placeholder}
              </PopoverTrigger>
              <PopoverContent className="w-auto px-6 py-5" align="start">
                <div className="[--cell-radius:9999px] [--cell-size:40px] [--primary-foreground:white] [--primary:var(--color-orange-500)]">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      field.onChange(selectedDate);
                      setIsOpen(false);
                    }}
                    locale={ko}
                    classNames={{
                      day: "[&>button]:rounded-full",
                      today: "[&>button]:rounded-full",
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
      }}
    />
  );
}
