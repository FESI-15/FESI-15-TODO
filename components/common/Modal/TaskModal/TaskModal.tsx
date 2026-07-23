import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Chips from "@/components/common/Chips";
import MetaInfo from "./MetaInfo/MetaInfo";
import AttachmentSection from "./AttachmentSection/AttachmentSection";
import NoteSection from "./NoteSection/NoteSection";
import type { GetTeamIdTodosTodoId200 } from "@/apis/model";
import { formatDate } from "date-fns";

interface TaskModalProps {
  children: React.ReactNode;
  todo: GetTeamIdTodosTodoId200;
}

export default function TaskModal({ children, todo }: TaskModalProps) {
  const deadline = todo.dueDate
    ? formatDate(new Date(todo.dueDate), "yyyy-MM-dd")
    : "";

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle showCloseButton={true}>
            <div className="flex items-center gap-2">
              {todo.title}
              <Chips variant={todo.done ? "done" : "to do"} />
            </div>
          </DialogTitle>
        </DialogHeader>
        <MetaInfo
          target={todo.goal?.title ?? ""}
          deadline={deadline}
          tags={todo.tags.map((tag) => tag.name)}
        />
        <AttachmentSection
          link={todo.linkUrl ?? ""}
          imageUrl={todo.fileUrl ?? ""}
        />
        <NoteSection
          noteId={todo.noteIds[0] ?? 0}
          noteTitle={todo.tags[0]?.name ?? ""}
        />
      </DialogContent>
    </Dialog>
  );
}
