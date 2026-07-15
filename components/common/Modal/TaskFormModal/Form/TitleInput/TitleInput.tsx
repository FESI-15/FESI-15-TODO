import { TextInput } from "@/components/common/input/TextInput";
import Title from "@/components/common/Modal/Title";

interface TitleInputProps {
  title: string;
  onChange: (title: string) => void;
}
export default function TitleInput({ title, onChange }: TitleInputProps) {
  return (
    <div>
      <Title essential>제목</Title>
      <TextInput
        value={title}
        onChange={(e) => onChange(e.target.value)}
        placeholder="할 일의 제목을 입력해주세요."
      />
    </div>
  );
}
