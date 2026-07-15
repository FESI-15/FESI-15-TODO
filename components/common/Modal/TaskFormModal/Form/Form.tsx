import Status from "./Status/Status";

interface FormProps {
  status: string;
  onChange: (status: string) => void;
}
export default function Form({ status, onChange }: FormProps) {
  return (
    <div>
      <Status status={status} onChange={onChange} />
    </div>
  );
}
