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
    <FieldGroup>
      <Field orientation="horizontal">
        <Checkbox
          id="terms-checkbox-basic"
          name="terms-checkbox-basic"
          checked={checked}
          onCheckedChange={onChange}
        />
        <FieldLabel
          className="text-gray-500 text-sm font-medium"
          htmlFor="terms-checkbox-basic"
        >
          {label}
        </FieldLabel>
      </Field>
    </FieldGroup>
  );
}
