import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Chips from "@/components/common/Chips";
import MetaInfo from "./MetaInfo/MetaInfo";
export default function TaskModal() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle showCloseButton={true}>
            <div className="flex items-center gap-2">
              자바스크립트 기초 챕터1 듣기
              <Chips variant="to do" />
            </div>
          </DialogTitle>
        </DialogHeader>
        <MetaInfo
          target="자바스크립트 기초 챕터1 듣기"
          deadline="2026-07-14"
          tags={["자바스크립트", "기초", "챕터1"]}
        />
      </DialogContent>
    </Dialog>
  );
}
