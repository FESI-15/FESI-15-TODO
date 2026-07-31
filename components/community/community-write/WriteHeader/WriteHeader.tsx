import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";

export function WriteHeader({ isValid }: { isValid: boolean }) {
  const router = useRouter();
  const handleCancel = () => {
    router.back();
  };
  return (
    <div className="flex justify-end md:justify-between items-center mb-3">
      <h2 className="text-xl font-semibold hidden md:block">게시물 작성하기</h2>
      <div className="flex gap-2">
        <div className="w-[106px]">
          <Button
            onClick={handleCancel}
            className="text-gray-500 w-full"
            hierarchy="tertiary"
            size="sm"
          >
            취소
          </Button>
        </div>
        <div className="w-[106px]">
          <Button
            type="submit"
            className="text-white w-full"
            hierarchy="primary"
            disabled={!isValid}
            size="sm"
          >
            등록하기
          </Button>
        </div>
      </div>
    </div>
  );
}
