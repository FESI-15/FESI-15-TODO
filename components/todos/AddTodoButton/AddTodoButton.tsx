import { Button } from "@/components/common/Button";
import PlusIcon from "@/public/icons/common/plus.svg";

export default function AddTodoButton() {
  return (
    <Button
      className="text-gray-500 font-semibold"
      size="md"
      hierarchy="tertiary"
      leftIcon={<PlusIcon />}
    >
      할 일 추가
    </Button>
  );
}
