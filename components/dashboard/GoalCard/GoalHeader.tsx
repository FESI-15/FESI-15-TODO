import { FormInput } from "@/components/common/input/FormInput";
import { useForm } from "react-hook-form";

interface GoalHeaderProps {
  title: string;
}

export default function GoalHeader({ title }: GoalHeaderProps) {
  const { control } = useForm<{ search: string }>({
    defaultValues: {
      search: "",
    },
  });
  return (
    <div className="flex flex-col gap-4 px-2 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <h3 className="min-w-0 flex-1 truncate text-base font-semibold text-gray-700">
          {title}
        </h3>
        {/* <div className="flex shrink-0 items-center gap-2">
          <div className="h-2 w-60 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-orange-500"
              style={{ width: `${goal.progress}%` }}
            />
          </div>
          <span className="w-10 text-base font-bold text-orange-600">
            {goal.progress}%
          </span>
        </div> */}
      </div>
      <div className="flex shrink-0 items-center gap-3.5">
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
