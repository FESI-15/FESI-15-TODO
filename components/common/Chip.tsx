import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const CHIP_LABEL = {
  todo: "TO DO",
  done: "DONE",
} as const;

const chipVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-lg px-1.5 py-0.5 text-xs font-semibold leading-4",
  {
    variants: {
      status: {
        todo: "bg-[#FEEFDC] text-[#EF6C00]",
        done: "bg-[#BBBBBB] text-white",
      },
    },
    defaultVariants: {
      status: "todo",
    },
  },
);

interface ChipProps extends VariantProps<typeof chipVariants> {
  className?: string;
}

export function Chip({ status, className }: ChipProps) {
  return (
    <span className={cn(chipVariants({ status }), className)}>
      {CHIP_LABEL[status ?? "todo"]}
    </span>
  );
}
