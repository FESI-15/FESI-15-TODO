import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LinkModalProps {
  onConfirm: () => void;
}

export default function LinkModal({ onConfirm }: LinkModalProps) {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>링크 업로드</DialogTitle>
        </DialogHeader>
        <div className="mt-6 md:mt-8">
          <input
            className="w-full p-4 rounded-[16px] border border-gray-300"
            type="text"
            placeholder="링크를 입력해주세요."
          />
        </div>
        <DialogFooter>
          <div className="flex gap-2 w-full mt-4 md:mt-6">
            <DialogClose
              render={
                <button
                  onClick={onConfirm}
                  type="button"
                  className="flex-1 py-2.5 rounded-full bg-primary text-white md:py-3.5"
                >
                  확인
                </button>
              }
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
