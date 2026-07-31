import { Button } from "@/components/common/Button";

export function WriteHeader() {
  return (
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-xl font-semibold">게시물 작성하기</h2>
      <div className="flex gap-2">
        <div className="w-[106px]">
          <Button
            className="text-gray-500 w-full"
            hierarchy="tertiary"
            size="sm"
          >
            취소
          </Button>
        </div>
        <div className="w-[106px]">
          <Button className="text-white w-full" hierarchy="primary" size="sm">
            등록하기
          </Button>
        </div>
      </div>
    </div>
  );
}
