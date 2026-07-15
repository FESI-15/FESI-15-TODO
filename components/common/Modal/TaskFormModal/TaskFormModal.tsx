import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import Form from "./Form/Form";

export default function TaskFormModal() {
  const [status, setStatus] = useState("to do");
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle showCloseButton={true}>할 일 생성</DialogTitle>
        </DialogHeader>
        <Form status={status} onChange={setStatus} />
      </DialogContent>
    </Dialog>
  );
}
