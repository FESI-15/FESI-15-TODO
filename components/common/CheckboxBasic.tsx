import { Checkbox } from "../ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "../ui/field";

interface CheckboxBasicProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}
export default function CheckboxBasic({
  label,
  checked,
  onChange,
}: CheckboxBasicProps) {
  return (
    <FieldGroup className="w-fit @container-normal">
      <Field orientation="horizontal" className="w-fit">
        <Checkbox
          id={`${label}-checkbox-basic`}
          name="terms-checkbox-basic"
          checked={checked}
          onCheckedChange={onChange}
        />
        <FieldLabel
          className="flex-none text-sm font-medium whitespace-nowrap text-gray-500"
          htmlFor={`${label}-checkbox-basic`}
        >
          {label}
        </FieldLabel>
      </Field>
    </FieldGroup>
  );
}
