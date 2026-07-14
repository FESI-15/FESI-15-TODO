import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Form from "./Form/Form";

interface PluginModalProps {
  onConfirm: () => void;
}

export default function PluginModal({ onConfirm }: PluginModalProps) {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle showCloseButton={true}>
            <div className="ml-2 flex items-center gap-2">
              <Image
                src="/icons/sidemenu/symbol.svg"
                alt="symbol"
                width={32}
                height={32}
              />
              <Image
                src="/icons/sidemenu/Slid to-do.svg"
                alt="Slid to-do"
                width={110}
                height={19}
              />
            </div>
          </DialogTitle>
        </DialogHeader>
        <Form />
        <DialogFooter>
          <div className="flex gap-2 w-full mt-8 md:mt-6">
            <DialogClose
              render={
                <button
                  type="button"
                  className="flex-1 py-2.5 rounded-full bg-primary text-white md:py-3.5"
                >
                  취소
                </button>
              }
            />
            <button
              onClick={onConfirm}
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
