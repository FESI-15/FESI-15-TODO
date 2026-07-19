import { Checkbox } from "../ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";

interface CheckboxBasicProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  value: string;
  label: string;
}

export default function CheckboxBasic<T extends FieldValues>({
  control,
  name,
  value,
  label,
}: CheckboxBasicProps<T>) {
  const checkboxId = `${label}-checkbox-basic`;
  const { field } = useController({
    control,
    name,
  });

  return (
    <FieldGroup className="w-fit @container-normal">
      <Field orientation="horizontal" className="w-fit">
        <Checkbox
          id={checkboxId}
          name={field.name}
          checked={field.value === value}
          onCheckedChange={(checked) => {
            if (checked === true) {
              field.onChange(value);
            }
          }}
        />
        <FieldLabel
          className="flex-none text-sm font-medium whitespace-nowrap text-gray-500"
          htmlFor={checkboxId}
        >
          {label}
        </FieldLabel>
      </Field>
    </FieldGroup>
  );
}
