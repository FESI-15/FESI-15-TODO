import { cva } from "class-variance-authority";

export const triggerVariants = cva(
  "group flex w-full items-center justify-between px-3 py-2.5 md:p-4 text-sm md:text-base font-pretendard tracking-[-0.03em] text-gray-700 dark:text-foreground rounded-[12px] md:rounded-2xl bg-white dark:bg-card border-1 border-gray-300 dark:border-border select-none transition-colors data-popup-open:border-orange-500 data-popup-open:shadow-md",
);

export const iconVariants = cva(
  "size-6 shrink-0 text-gray-600 dark:text-muted-foreground transition-transform duration-200 group-data-popup-open:rotate-180",
);

export const popupVariants = cva(
  "w-[var(--anchor-width)] p-[6px] rounded-2xl bg-white dark:bg-popover shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] outline-none",
);

export const itemVariants = cva(
  "flex items-center w-full h-[52px] px-[8px] py-[8px] text-base leading-6 rounded-xl outline-none font-pretendard font-medium tracking-[-0.03em] text-gray-700 dark:text-foreground cursor-pointer transition-colors duration-200 bg-transparent data-highlighted:bg-orange-200 data-selected:bg-orange-200 dark:data-highlighted:bg-orange-500/10 dark:data-selected:bg-orange-500/10",
);
