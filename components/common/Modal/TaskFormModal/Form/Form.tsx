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
}
export default function Form({ control }: FormProps) {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <Status control={control} />
      <TitleInput control={control} />
      <GoalSelect />
      <DeadLine control={control} />
      <TagSection control={control} />
      <LinkSection control={control} />
      <ImageSection control={control} />
    </div>
  );
}
