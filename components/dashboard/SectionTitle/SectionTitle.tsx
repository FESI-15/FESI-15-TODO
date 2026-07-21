import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface SectionTitleProps {
  icon: ReactNode;
  iconClassName: string;
  children: ReactNode;
}

export default function SectionTitle({
  icon,
  iconClassName,
  children,
}: SectionTitleProps) {
  return (
    <div className="flex items-center gap-3 px-2">
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl",
          iconClassName,
        )}
      >
        {icon}
      </div>
      <h2 className="text-lg font-medium text-gray-900">{children}</h2>
    </div>
  );
}
