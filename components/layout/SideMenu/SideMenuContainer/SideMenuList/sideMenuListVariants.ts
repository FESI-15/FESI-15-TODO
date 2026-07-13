import { cva, type VariantProps } from "class-variance-authority";

export const sideMenuListTextVariants = cva(
  "flex items-center justify-between py-3.5 px-4 rounded-[20px] text-gray-700 w-full font-semibold hover:text-orange-700 group",
  {
    variants: {
      isActive: {
        true: "bg-orange-200 text-orange-700",
      },
    },
  },
);

export const sideMenuListIconVariants = cva(
  "w-6 h-6 text-gray-300 group-hover:text-orange-600",
  {
    variants: {
      isActive: {
        true: "text-orange-600",
      },
    },
  },
);

export type SideMenuListTextVariantProps = VariantProps<
  typeof sideMenuListTextVariants
>;

export type SideMenuListIconVariantProps = VariantProps<
  typeof sideMenuListIconVariants
>;
