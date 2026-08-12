import { cva } from "class-variance-authority";

export const sectionHeadingSubtitleClassName =
  "text-base leading-6 font-semibold tracking-[-0.03em] text-orange-600 md:text-2xl md:leading-8 lg:text-[30px] lg:leading-9";

export const headingContainerVariants = cva("flex flex-col", {
  variants: {
    align: {
      center: "items-center gap-1 text-center md:gap-3 lg:gap-4.5",
      right: "items-end gap-3 text-right md:gap-6",
    },
  },
  defaultVariants: {
    align: "center",
  },
});

export const titleVariants = cva(
  "text-xl leading-7.5 font-bold tracking-[-0.03em] text-gray-700 md:text-4xl md:leading-11 lg:text-5xl lg:leading-13",
  {
    variants: {
      align: {
        center: "",
        right: "",
      },
      multiline: {
        true: "flex flex-col gap-2 lg:gap-4.5",
        false: "",
      },
    },
    compoundVariants: [
      { align: "center", multiline: true, className: "items-center" },
      { align: "right", multiline: true, className: "items-end" },
      {
        align: "center",
        multiline: false,
        className: "flex flex-wrap justify-center gap-x-1.5",
      },
      {
        align: "right",
        multiline: false,
        className: "flex flex-wrap justify-end gap-x-1.5",
      },
    ],
    defaultVariants: {
      align: "center",
      multiline: false,
    },
  },
);
