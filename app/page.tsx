import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent showCloseButton={false}>
          <div className="flex flex-col gap-1 text-center mt-6">
            <p className="font-semibold text-xl text-gray-800">
              정말 삭제하시겠어요?
            </p>
            <div className="flex items-center gap-1 justify-center">
              <Image
                src="/icons/modal/alert.svg"
                alt="alert"
                width={20}
                height={20}
              />
              <p className="font-medium text-orange-600">
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
                    className="flex-1 rounded-full bg-gray-200 py-3.5"
                  >
                    취소
                  </button>
                }
              />
              <button className="flex-1 py-3.5 rounded-full bg-primary text-white">
                확인
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
