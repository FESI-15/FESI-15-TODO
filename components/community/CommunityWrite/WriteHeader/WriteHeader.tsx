import { useEffect } from "react";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import useHeaderStore from "@/store/useHeaderStore";

interface WriteHeaderProps {
  isValid: boolean;
  isEdit?: boolean;
}

export function WriteHeader({ isValid, isEdit = false }: WriteHeaderProps) {
  const router = useRouter();
  const setTitle = useHeaderStore((s) => s.setTitle);

  useEffect(() => {
    setTitle(isEdit ? "게시물 수정하기" : "게시물 작성하기");
  }, [isEdit, setTitle]);

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="flex justify-end lg:justify-between items-center mb-3">
      <h2 className="text-xl font-semibold hidden lg:block dark:text-foreground">
        {isEdit ? "게시물 수정하기" : "게시물 작성하기"}
      </h2>
      <div className="flex gap-2">
        <div className="w-[106px]">
          <Button
            onClick={handleCancel}
            className="text-gray-500 dark:text-muted-foreground w-full"
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
