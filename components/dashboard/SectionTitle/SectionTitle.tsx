import type { ReactNode } from "react";

interface SectionTitleProps {
  icon: ReactNode;
  children: ReactNode;
}

export default function SectionTitle({ icon, children }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-3 px-2">
      {icon}
      <h2 className="text-lg font-medium text-gray-900">{children}</h2>
    </div>
  );
}
