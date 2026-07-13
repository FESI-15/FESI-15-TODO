"use client";
import { Badge } from "@/components/common/Badge";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 m-10">
      <div className="flex gap-2">
        <Badge variant="default" remove={true} onRemove={() => {}}>
          Default
        </Badge>
        <Badge variant="red" remove={true} onRemove={() => {}}>
          Red
        </Badge>
        <Badge variant="green" remove={true} onRemove={() => {}}>
          Green
        </Badge>
        <Badge variant="yellow" remove={true} onRemove={() => {}}>
          Yellow
        </Badge>
        <Badge variant="purple" remove={true} onRemove={() => {}}>
          Purple
        </Badge>
      </div>
      <div className="flex gap-2">
        <Badge variant="default" onRemove={() => {}}>
          Default
        </Badge>
        <Badge variant="red" onRemove={() => {}}>
          Red
        </Badge>
        <Badge variant="green" onRemove={() => {}}>
          Green
        </Badge>
        <Badge variant="yellow" onRemove={() => {}}>
          Yellow
        </Badge>
        <Badge variant="purple" onRemove={() => {}}>
          Purple
        </Badge>
      </div>
    </div>
  );
}
