import type { Control } from "react-hook-form";
import { FormInput } from "@/components/common/input/FormInput";

interface GoalHeaderProps {
  title: string;
  progress: number;
  control: Control<{ search: string }>;
}

export default function GoalHeader({
  title,
  progress,
  control,
}: GoalHeaderProps) {
  return (
    <div className="flex justify-between md:items-center gap-4 px-2 flex-col md:flex-row">
      <div className="flex flex-col gap-1 lg:gap-4 lg:justify-between lg:items-center lg:flex-row md:w-1/2 max-w-[608px]">
        <h3 className="lg:max-w-[170px] w-full truncate text-base font-semibold text-gray-700">
          {title}
        </h3>
        <div className="flex items-center lg:justify-end gap-2 w-full">
          <div className="h-2 max-w-60 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-orange-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-base font-bold text-orange-600">
            {progress}%
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3.5 w-full md:w-auto">
        <FormInput
          control={control}
          name="search"
          variant="search"
          placeholder="할 일을 검색해주세요"
        />
      </div>
    </div>
  );
}
