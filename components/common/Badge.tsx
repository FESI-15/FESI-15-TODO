import { cva } from "class-variance-authority";

interface BadgeProps {
  children: React.ReactNode;
  variant:
    "red" | "green" | "yellow" | "blue" | "purple" | "orange" | "pink" | "gray";
}

const badgeVariants = cva("px-2 py-1 rounded-md text-white", {
  variants: {
    variant: {
      red: "bg-red-500 text-white",
      green: "bg-green-500 text-white",
      yellow: "bg-yellow-500 text-white",
      blue: "bg-blue-500 text-white",
      purple: "bg-purple-500 text-white",
      orange: "bg-orange-500 text-white",
      pink: "bg-pink-500 text-white",
      gray: "bg-gray-500 text-white",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export function Badge({ children, variant }: BadgeProps) {
  return <div className={badgeVariants({ variant })}>{children}</div>;
}
