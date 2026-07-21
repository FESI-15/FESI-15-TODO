import { Checkbox } from "../ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";
import { cn } from "@/utils/cn";

interface CheckboxBasicProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  value: string;
  label: string;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
}

export default function CheckboxBasic<T extends FieldValues>({
  control,
  name,
  value,
  label,
  className,
  labelClassName,
  disabled = false,
}: CheckboxBasicProps<T>) {
  const checkboxId = `${label}-checkbox-basic`;
  const { field } = useController({
    control,
    name,
  });

  return (
    <FieldGroup className={cn("w-fit @container-normal", className)}>
      <Field orientation="horizontal" className="w-fit">
        <Checkbox
          id={checkboxId}
          name={field.name}
          checked={field.value === value}
          disabled={disabled}
          onCheckedChange={(checked) => {
            if (checked === true) {
              field.onChange(value);
            }
          }}
        />
        <FieldLabel
          className={cn(
            "flex-none text-sm font-medium whitespace-nowrap text-gray-500",
            labelClassName,
          )}
          htmlFor={checkboxId}
        >
          {label}
        </FieldLabel>
      </Field>
    </FieldGroup>
  );
}
