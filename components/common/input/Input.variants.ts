import { cva } from "class-variance-authority";

// 라벨
export const inputLabelClassName =
  "pl-1 text-base font-semibold text-gray-700 dark:text-foreground";

export const inputFieldVariants = cva("", {
  variants: {
    size: {
      desktop: "w-full",
      mobile: "w-full",
    },
  },
  defaultVariants: {
    size: "desktop",
  },
});

export const inputVariants = cva(
  "rounded-[12px] p-3 text-sm placeholder:text-sm md:text-base md:p-4 md:rounded-[16px] md:placeholder:text-base w-full border border-gray-300 dark:border-border bg-white dark:bg-card text-gray-700 dark:text-foreground transition-colors placeholder:text-gray-500 dark:placeholder:text-muted-foreground focus-visible:border-orange-500 focus-visible:ring-0 aria-invalid:border-red-500 aria-invalid:ring-0",
  {
    variants: {
      hasLeftIcon: {
        true: "pl-10 md:pl-12",
      },
      hasRightAction: {
        true: "pr-10 md:pr-12",
      },
      variant: {
        text: "",
        link: "",
        search:
          "w-full rounded-full md:rounded-full pl-3 py-2 md:py-2.5 md:px-5 pr-10",
        password: "",
      },
    },
  },
);

// 비밀번호 PasswordInput
export const eyeIconVariants = cva("text-gray-500 dark:text-muted-foreground", {
  variants: {
    size: {
      desktop: "h-6 w-6",
      mobile: "h-5 w-5",
    },
  },
  defaultVariants: {
    size: "desktop",
  },
});

export const imagePreviewClassName =
  "relative h-[101px] w-[160px] rounded-2xl overflow-hidden";

// 태그 TagInput
export const tagInputFieldVariants = cva("", {
  variants: {
    size: {
      desktop: "w-[400px]",
      mobile: "w-[327px]",
    },
  },
  defaultVariants: { size: "desktop" },
});

export const tagInputBoxVariants = cva(
  "p-3 text-sm md:text-base md:p-4 flex flex-wrap items-center gap-2 rounded-2xl border border-gray-300 dark:border-border bg-white dark:bg-card transition-colors focus-within:border-orange-500",
  {
    variants: {
      size: {
        desktop: "min-h-14 px-4 py-4 text-base",
        mobile: "min-h-11 px-3 py-3 text-sm",
      },
    },
    defaultVariants: { size: "desktop" },
  },
);

export const dateInputTriggerVariants = cva(
  "p-3 md:p-4 text-sm md:text-base flex w-full items-center gap-2 rounded-[12px] md:rounded-[16px] border border-gray-300 dark:border-border bg-white dark:bg-card text-left transition-colors outline-none",
  {
    variants: {
      hasValue: {
        true: "text-gray-700 dark:text-foreground",
        false: "text-gray-500 dark:text-muted-foreground",
      },
    },
    defaultVariants: { hasValue: false },
  },
);

export const dateInputIconVariants = cva(
  "shrink-0 text-gray-500 dark:text-muted-foreground h-5 w-5 md:h-6 md:w-6",
  {
    variants: {
      size: {
        desktop: "h-6 w-6",
        mobile: "h-5 w-5",
      },
    },
    defaultVariants: { size: "desktop" },
  },
);
