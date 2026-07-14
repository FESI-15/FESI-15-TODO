export default function LanguageSelect() {
  return (
    <div className="mt-8">
      <p className="mb-2 text-sm font-semibold text-gray-700 md:text-base">
        언어
      </p>
      <input
        className="w-full p-4 rounded-[16px] border border-gray-300"
        type="text"
        placeholder="언어를 선택해주세요"
      />
    </div>
  );
}
