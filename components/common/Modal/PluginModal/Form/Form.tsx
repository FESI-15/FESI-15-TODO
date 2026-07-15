import { TextInput } from "@/components/common/input/TextInput";

export default function Form() {
  return (
    <>
      <div className="mt-8 flex flex-col gap-2.5 md:gap-3">
        <TextInput fieldClassName="w-full" placeholder="링크를 입력해주세요" />
        <TextInput fieldClassName="w-full" placeholder="할 일을 입력해주세요" />
      </div>
      <div className="mt-2.5 md:mt-6">
        <p className="text-sm font-medium text-gray-500 mb-2 md:text-base md:font-semibold">
          Add to
        </p>
        <input
          className="w-full p-4 rounded-[16px] border border-gray-300"
          type="text"
          placeholder="목표를 선택해주세요"
        />
      </div>
    </>
  );
}
