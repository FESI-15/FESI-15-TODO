import { cva } from "class-variance-authority";

export const notificationHeaderTextClassName =
  "text-sm font-semibold text-slate-700";

export const notificationMarkAllClassName = cva(
  "cursor-pointer text-xs font-semibold transition-colors px-2",
  {
    variants: {
      hasUnread: {
        true: "text-orange-500 hover:text-orange-600",
        false: "text-slate-300 cursor-default",
      },
    },
    defaultVariants: { hasUnread: false },
  },
);

export const notificationItemVariants = cva(
  "flex w-[265px] shrink-0 items-start gap-2 rounded-2xl bg-white px-2 py-3 cursor-pointer transition-colors hover:bg-slate-50",
);
