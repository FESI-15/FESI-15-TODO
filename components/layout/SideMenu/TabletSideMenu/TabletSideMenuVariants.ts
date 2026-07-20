import { cva, type VariantProps } from "class-variance-authority";

export const tabletSideMenuButtonVariants = cva(
  "block text-gray-300 hover:text-gray-400",
  {
    variants: {
      open: {
        true: "mb-8 ml-auto rotate-180",
        false: "mb-0 mx-auto",
      },
    },
  },
);
export const tabletSideMenuVariants = cva(
  "hidden md:block absolute top-0 left-0 min-h-screen bg-white rounded-r-[48px] shadow-xl",
  {
    variants: {
      open: {
        true: "p-8",
        false: "px-2.5 py-8 flex flex-col items-center",
      },
    },
  },
);

export type TabletSideMenuVariantProps = VariantProps<
  typeof tabletSideMenuVariants
>;
