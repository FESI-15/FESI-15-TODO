import Status from "./Status/Status";
import TitleInput from "./TitleInput/TitleInput";
import { useState } from "react";

interface FormProps {
  status: string;
  onChange: (status: string) => void;
}
export default function Form({ status, onChange }: FormProps) {
  const [title, setTitle] = useState("");
  return (
    <div className="flex flex-col gap-3 mt-4">
      <Status status={status} onChange={onChange} />
      <TitleInput title={title} onChange={setTitle} />
    </div>
  );
}
