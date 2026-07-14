import { cva } from "class-variance-authority";

// 라벨
export const inputLabelClassName = "pl-1 text-base font-semibold text-gray-700";

// 기본 TextInput
// Field(바깥 컨테이너)가 실제 크기를 결정
export const inputFieldVariants = cva("", {
  variants: {
    size: {
      desktop: "w-[400px]",
      mobile: "w-[327px]",
    },
  },
  defaultVariants: {
    size: "desktop",
  },
});

// Input 자체는 Field가 준 너비를 100% 채움 (Field의 *:w-full이 이미 처리)
export const inputVariants = cva(
  "w-full rounded-2xl border bg-white text-gray-700 placeholder:text-gray-500 transition-colors border-gray-300 focus-visible:border-orange-500 focus-visible:ring-0 aria-invalid:border-red-500 aria-invalid:ring-0",
  {
    variants: {
      size: {
        desktop: "h-14 px-4 text-base",
        mobile: "h-11 px-3 text-sm",
      },
    },
    defaultVariants: {
      size: "desktop",
    },
  },
);

// 비밀번호 PasswordInput
export const eyeIconVariants = cva("text-gray-500", {
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

// 검색 SearchInput
export const searchInputFieldClassName = "w-[302px]";

export const searchInputVariants = cva(
  "h-12 w-full rounded-full border border-gray-300 bg-white py-3 pl-5 pr-11 text-base text-gray-700 placeholder:text-gray-500 transition-colors focus-visible:border-gray-300 focus-visible:ring-0",
);

// 파일 업로드 FileUploadInput
export const fileInputFieldVariants = cva("", {
  variants: {
    size: {
      desktop: "w-[400px]",
      mobile: "w-[327px]",
    },
  },
  defaultVariants: { size: "desktop" },
});

export const fileInputBoxVariants = cva(
  "flex items-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 cursor-pointer transition-colors",
  {
    variants: {
      size: {
        desktop: "h-14 px-4 text-base",
        mobile: "h-11 px-3 text-sm",
      },
    },
    defaultVariants: { size: "desktop" },
  },
);

export const fileUploadIconVariants = cva("shrink-0 text-gray-500", {
  variants: {
    size: {
      desktop: "h-6 w-6",
      mobile: "h-5 w-5",
    },
  },
  defaultVariants: { size: "desktop" },
});

export const fileDeleteIconVariants = cva("shrink-0 text-gray-400", {
  variants: {
    size: {
      desktop: "h-6 w-6",
      mobile: "h-5 w-5",
    },
  },
  defaultVariants: { size: "desktop" },
});

export const fileInputTextVariants = cva("truncate font-normal", {
  variants: {
    size: {
      desktop: "text-base",
      mobile: "text-sm",
    },
    hasFile: {
      true: "text-gray-700",
      false: "text-gray-500",
    },
  },
  defaultVariants: { size: "desktop", hasFile: false },
});

// 이미지 첨부 ImageUploadInput
export const imageInputFieldVariants = cva("", {
  variants: {
    size: {
      desktop: "w-[424px]",
      mobile: "w-[327px]",
    },
  },
  defaultVariants: { size: "desktop" },
});

export const imageInputBoxVariants = cva(
  "flex h-[101px] flex-col items-center justify-center gap-0.5 rounded-2xl border border-dashed border-gray-300 bg-gray-50 cursor-pointer transition-colors",
  {
    variants: {
      size: {
        desktop: "w-[424px]",
        mobile: "w-[327px]",
      },
    },
    defaultVariants: { size: "desktop" },
  },
);

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
  "flex flex-wrap items-center gap-2 rounded-2xl border border-gray-300 bg-white transition-colors focus-within:border-orange-500",
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

// 날짜 DateInput
export const dateInputFieldVariants = cva("", {
  variants: {
    size: {
      desktop: "w-[400px]",
      mobile: "w-[327px]",
    },
  },
  defaultVariants: { size: "desktop" },
});

export const dateInputTriggerVariants = cva(
  "flex w-full items-center gap-2 rounded-2xl border border-gray-300 bg-white text-left transition-colors outline-none !focus-visible:border-orange-500",
  {
    variants: {
      size: {
        desktop: "h-14 px-4 text-base",
        mobile: "h-11 px-3 text-sm",
      },
      hasValue: {
        true: "text-gray-700",
        false: "text-gray-500",
      },
    },
    defaultVariants: { size: "desktop", hasValue: false },
  },
);

export const dateInputIconVariants = cva("shrink-0 text-gray-500", {
  variants: {
    size: {
      desktop: "h-6 w-6",
      mobile: "h-5 w-5",
    },
  },
  defaultVariants: { size: "desktop" },
});
