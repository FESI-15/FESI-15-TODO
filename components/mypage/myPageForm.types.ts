import { z } from "zod";

const optionalPasswordField = z.string().optional();

export const myPageFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "이름을 입력해주세요")
      .max(20, "이름은 20자 이하로 입력해주세요"),
    image: z.string().optional(),
    currentPassword: optionalPasswordField,
    newPassword: optionalPasswordField,
    confirmPassword: optionalPasswordField,
  })
  .superRefine((data, ctx) => {
    const currentPassword = data.currentPassword ?? "";
    const newPassword = data.newPassword ?? "";
    const confirmPassword = data.confirmPassword ?? "";

    const hasAnyPasswordInput =
      currentPassword !== "" || newPassword !== "" || confirmPassword !== "";

    if (!hasAnyPasswordInput) {
      return;
    }

    if (currentPassword === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "현재 비밀번호를 입력해주세요",
        path: ["currentPassword"],
      });
    }

    if (newPassword.length < 8 || newPassword.length > 72) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호는 8자 이상 입력해주세요",
        path: ["newPassword"],
      });
    }

    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다",
        path: ["confirmPassword"],
      });
    }
  });

export type MyPageFormValues = z.infer<typeof myPageFormSchema>;
