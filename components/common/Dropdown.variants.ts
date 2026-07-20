import { cva } from "class-variance-authority";

export const triggerVariants = cva(
  "group flex w-full items-center justify-between px-[16px] py-[16px] text-base font-pretendard font-medium tracking-[-0.03em] text-gray-700 rounded-2xl bg-white border-2 border-gray-200 select-none transition-colors data-popup-open:border-orange-500 data-popup-open:shadow-md",
);

export const iconVariants = cva(
  "size-6 shrink-0 text-gray-600 transition-transform duration-200 group-data-popup-open:rotate-180",
);

export const popupVariants = cva(
  "w-[var(--anchor-width)] p-[6px] rounded-2xl bg-white shadow-lg outline-none",
);

export const itemVariants = cva(
  "flex items-center w-full h-[52px] px-[8px] py-[8px] text-base leading-6 rounded-xl outline-none font-pretendard font-medium tracking-[-0.03em] text-gray-700 cursor-pointer transition-colors duration-200 bg-transparent data-highlighted:bg-orange-200 data-selected:bg-orange-200",
);
