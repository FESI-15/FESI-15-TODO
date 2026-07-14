import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex flex-row items-center justify-center rounded-full font-semibold box-border transition-colors duration-200",
  {
    variants: {
      hierarchy: {
        primary:
          "bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-500",
        secondary:
          "bg-transparent border border-orange-500 text-orange-500 hover:border-orange-600 hover:text-orange-600 disabled:border-gray-500 disabled:text-gray-500",
        tertiary:
          "bg-transparent border border-gray-300 text-gray-300 hover:border-gray-500 hover:text-gray-500 disabled:border-gray-300 disabled:text-gray-300",
      },
      size: {
        lg: "h-14 py-[14px] px-[18px] gap-1 text-lg",
        md: "h-12 py-[12px] px-[18px] gap-1 text-base",
        sm: "h-10 py-[10px] px-[18px] gap-1 text-sm",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      hierarchy: "primary",
      size: "lg",
    },
  },
);

interface ButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

export function Button({
  hierarchy,
  size,
  fullWidth,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  type = "button",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      type={asChild ? undefined : type}
      disabled={disabled}
      className={cn(buttonVariants({ hierarchy, size, fullWidth }), className)}
      {...props}
    >
      {leftIcon && (
        <span className="shrink-0 flex items-center">{leftIcon}</span>
      )}
      {children}
      {rightIcon && (
        <span className="shrink-0 flex items-center">{rightIcon}</span>
      )}
    </Comp>
  );
}
