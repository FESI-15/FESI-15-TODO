import { cva } from "class-variance-authority";

export const inputLabelClassName = "pl-1 text-base font-semibold text-gray-700";

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

export const eyeIconVariants = cva("h-6 w-6 text-gray-500", {
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
