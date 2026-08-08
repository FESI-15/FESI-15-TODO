import type { UseFormRegister, UseFormWatch } from "react-hook-form";
import type { WriteFormValues } from "@/types/communityWriteSchema";

interface WriteTitleInputProps {
  register: UseFormRegister<WriteFormValues>;
  watch: UseFormWatch<WriteFormValues>;
}

const titleMaxLength = 30;

export function WriteTitleInput({ register, watch }: WriteTitleInputProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-200 dark:border-border pb-4">
      <input
        type="text"
        {...register("title")}
        placeholder="게시물의 제목을 입력해주세요"
        className="w-full font-semibold text-gray-700 dark:text-foreground placeholder:font-semibold placeholder:text-[#bbbbbb] dark:placeholder:text-muted-foreground focus:outline-none"
      />
      <p className="shrink-0 text-xs text-gray-500 dark:text-muted-foreground">
        {watch("title")?.length} /
        <span className="text-orange-500">{titleMaxLength}</span>
      </p>
    </div>
  );
}
