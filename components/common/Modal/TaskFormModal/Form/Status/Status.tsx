import CheckboxBasic from "@/components/common/CheckboxBasic";
import Title from "@/components/common/Modal/Title";

interface StatusProps {
  status: string;
  onChange: (status: string) => void;
}
export default function Status({ status, onChange }: StatusProps) {
  return (
    <div>
      <Title essential>상태</Title>
      <div className="flex gap-3 items-center ">
        <CheckboxBasic
          label={"To do"}
          checked={status === "to do"}
          onChange={() => onChange("to do")}
        />
        <CheckboxBasic
          label={"done"}
          checked={status === "done"}
          onChange={() => onChange("done")}
        />
      </div>
    </div>
  );
}
