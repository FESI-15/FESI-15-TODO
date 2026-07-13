import { cva, type VariantProps } from "class-variance-authority";

export const tabletSideMenuButtonVariants = cva("block", {
  variants: {
    open: {
      true: "mb-8 ml-auto rotate-180",
      false: "mb-0 ml-0",
    },
  },
});
export const tabletSideMenuVariants = cva(
  "fixed top-0 left-0 min-h-screen bg-white rounded-r-[48px] shadow-xl",
  {
    variants: {
      open: {
        true: "w-[362px] p-8",
        false: "w-[60px] px-2.5 py-8 flex flex-col items-center",
      },
    },
  },
);

export type TabletSideMenuVariantProps = VariantProps<
  typeof tabletSideMenuVariants
>;
