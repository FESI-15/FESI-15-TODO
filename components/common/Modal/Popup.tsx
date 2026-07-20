import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../Button";

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
                <Button
                  className="text-gray-500"
                  fullWidth
                  hierarchy="tertiary"
                  size="lg"
                >
                  취소
                </Button>
              }
            />
            <Button fullWidth hierarchy="primary" size="lg" onClick={onDelete}>
              확인
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
