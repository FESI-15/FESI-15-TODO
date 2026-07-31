import { UseFormRegister, UseFormWatch } from "react-hook-form";

interface WriteTitleInputProps {
  register: UseFormRegister<{ title: string }>;
  watch: UseFormWatch<{ title: string }>;
}

const titleMaxLength = 30;

export function WriteTitleInput({ register, watch }: WriteTitleInputProps) {
  return (
    <div className="pb-4 border-b border-gray-200 flex items-center justify-between gap-3">
      <input
        type="text"
        {...register("title", { required: true, minLength: 1, maxLength: 100 })}
        placeholder="게시물의 제목을 입력해주세요"
        className="w-full text-gray-700 font-semibold placeholder:text-[#bbbbbb] placeholder:font-semibold focus:outline-none"
      />
      <p className="text-sm text-gray-500 shrink-0">
        {watch("title")?.length} / {titleMaxLength}
      </p>
    </div>
  );
}
