import { twMerge } from "tailwind-merge";
import { inputVariants } from "@/components/common/input/Input.variants";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input as ShadcnInput } from "@/components/ui/input";

interface MyPageEmailFieldProps {
  email?: string;
}

export function MyPageEmailField({ email }: MyPageEmailFieldProps) {
  return (
    <Field className="gap-2">
      <FieldLabel className="text-sm md:text-base font-semibold text-gray-700 dark:text-foreground">
        이메일
      </FieldLabel>
      <ShadcnInput
        readOnly
        value={email ?? ""}
        className={twMerge(
          inputVariants({ variant: "text" }),
          "bg-[#FAFAFA] dark:bg-muted",
        )}
      />
    </Field>
  );
}
