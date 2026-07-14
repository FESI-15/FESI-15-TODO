import { cva } from "class-variance-authority";

const chipsVariants = cva(
  "inline-block w-fit py-1 px-1.5 rounded-md text-xs font-semibold",
  {
    variants: {
      variant: {
        "to do": "text-orange-600 bg-orange-200",
        done: "text-white bg-[#bbbbbb]",
      },
    },
  },
);

interface ChipsProps {
  variant: "to do" | "done";
}

export default function Chips({ variant }: ChipsProps) {
  return (
    <span className={chipsVariants({ variant })}>{variant.toUpperCase()}</span>
  );
}
