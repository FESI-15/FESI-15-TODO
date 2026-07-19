import Status from "./Status/Status";
import TitleInput from "./TitleInput/TitleInput";
import GoalSelect from "./GoalSelect/GoalSelect";
import DeadLine from "./DeadLine/DeadLine";
import TagSection from "./TagSection/TagSection";
import LinkSection from "./LinkSection/LinkSection";
import ImageSection from "./ImageSection/ImageSection";
import type { Control } from "react-hook-form";
import type { TaskFormValues } from "../TaskFormModal";

interface FormProps {
  control: Control<TaskFormValues>;
  status: string;
  onChange: (status: string) => void;
}
export default function Form({ control, status, onChange }: FormProps) {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <Status status={status} onChange={onChange} />
      <TitleInput control={control} />
      <GoalSelect />
      <DeadLine control={control} />
      <TagSection />
      <LinkSection control={control} />
      <ImageSection />
    </div>
  );
}
