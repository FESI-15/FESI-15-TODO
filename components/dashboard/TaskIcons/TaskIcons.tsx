import { FileText, Link, MoreVertical, Pencil, Star } from "lucide-react";

import type { DashboardTask } from "@/components/dashboard/types";
import { cn } from "@/utils/cn";

interface TaskIconsProps {
  task: DashboardTask;
  dense?: boolean;
}

export default function TaskIcons({ task, dense = false }: TaskIconsProps) {
  const iconClassName = dense ? "size-4" : "size-3.5";

  return (
    <div className="flex h-6 shrink-0 items-center justify-end gap-2">
      <span className="flex size-6 items-center justify-center rounded-full bg-orange-200 text-orange-600">
        <FileText className={iconClassName} />
      </span>
      <span className="flex size-6 items-center justify-center rounded-full bg-orange-200 text-orange-600">
        <Link className={iconClassName} />
      </span>
      <span className="flex size-6 items-center justify-center rounded-full bg-white text-orange-600">
        <MoreVertical className={iconClassName} />
      </span>
      <Star
        className={cn(
          "size-5 shrink-0",
          task.favorite ? "fill-orange-500 text-orange-500" : "text-orange-300",
        )}
      />
    </div>
  );
}
