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
import { Button } from "../../Button";

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
            <Button fullWidth onClick={onConfirm} hierarchy="primary" size="lg">
              확인
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
