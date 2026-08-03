import { useCallback, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import useHeaderStore from "@/store/useHeaderStore";

interface WriteHeaderProps {
  isValid: boolean;
  isEdit?: boolean;
  onSubmit: () => void;
}

export function WriteHeader({
  isValid,
  isEdit = false,
  onSubmit,
}: WriteHeaderProps) {
  const router = useRouter();
  const setTitle = useHeaderStore((s) => s.setTitle);
  const setActions = useHeaderStore((s) => s.setActions);

  useEffect(() => {
    setTitle(isEdit ? "게시물 수정하기" : "게시물 작성하기");
  }, [isEdit, setTitle]);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    setActions(
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="text-sm text-gray-500"
        >
          취소
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isValid}
          className="text-sm font-semibold text-gray-900 disabled:text-gray-300"
        >
          {isEdit ? "수정" : "등록"}
        </button>
      </div>,
    );

    return () => setActions(null);
  }, [handleCancel, isEdit, isValid, onSubmit, setActions]);

  return (
    <div className="flex justify-end md:justify-between items-center mb-3">
      <h2 className="text-xl font-semibold hidden md:block">
        {isEdit ? "게시물 수정하기" : "게시물 작성하기"}
      </h2>
      <div className="hidden md:flex gap-2">
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
            {isEdit ? "수정하기" : "등록하기"}
          </Button>
        </div>
      </div>
    </div>
  );
}
