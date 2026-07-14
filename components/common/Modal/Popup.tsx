import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface PopupProps {
  onDelete: () => void;
}

export default function Popup({ onDelete }: PopupProps) {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <div className="flex flex-col gap-1 text-center mt-6 mb-8 md:mb-10">
          <p className="font-semibold text-sm md:text-xl text-gray-800">
            정말 삭제하시겠어요?
          </p>
          <div className="flex items-center gap-1 justify-center">
            <Image
              src="/icons/modal/alert.svg"
              alt="alert"
              width={20}
              height={20}
            />
            <p className="font-medium text-xs md:text-base text-orange-600">
              삭제된 목표는 복구할 수 없습니다.
            </p>
          </div>
        </div>
        <DialogFooter>
          <div className="flex gap-2 w-full">
            <DialogClose
              render={
                <button
                  type="button"
                  className="flex-1 rounded-full bg-gray-200 py-2.5 md:py-3.5"
                >
                  취소
                </button>
              }
            />
            <button
              onClick={onDelete}
              type="button"
              className="flex-1 py-2.5 rounded-full bg-primary text-white md:py-3.5"
            >
              확인
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
