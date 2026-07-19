import { TagInput } from "@/components/common/input/TagInput";
import Title from "../../../Title";
import { useState } from "react";

export default function TagSection() {
  const [tags, setTags] = useState<string[]>([]);
  const handleTagsChange = (tags: string[]) => {
    setTags(tags);
  };
  return (
    <div>
      <Title marginBottom>태그</Title>
      <TagInput tags={tags} onTagsChange={handleTagsChange} />
    </div>
  );
}
