import { Checkbox } from "../ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "../ui/field";

interface CheckboxBasicProps {
  label: string;
}
export default function CheckboxBasic({ label }: CheckboxBasicProps) {
  return (
    <FieldGroup>
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
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
