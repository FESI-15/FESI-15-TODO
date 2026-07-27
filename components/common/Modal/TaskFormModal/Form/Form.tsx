import TitleInput from "./TitleInput/TitleInput";
import GoalSelect from "./GoalSelect/GoalSelect";
import DeadLine from "./DeadLine/DeadLine";
import TagSection from "./TagSection/TagSection";
import LinkSection from "./LinkSection/LinkSection";
import ImageSection from "./ImageSection/ImageSection";
import type { Control } from "react-hook-form";
import { PostTeamIdTodosBody } from "@/apis/model";

interface FormProps {
  control: Control<PostTeamIdTodosBody>;
}
export default function Form({ control }: FormProps) {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <TitleInput control={control} />
      <GoalSelect control={control} />
      <DeadLine control={control} />
      <TagSection control={control} />
      <LinkSection control={control} />
      <ImageSection control={control} />
    </div>
  );
}
