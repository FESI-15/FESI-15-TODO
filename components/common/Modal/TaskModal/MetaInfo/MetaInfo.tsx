import { Badge } from "@/components/common/Badge";
import Image from "next/image";

interface MetaInfoProps {
  target: string;
  deadline: string;
  tags: string[];
}

const tagVariants = ["default", "red", "green", "yellow", "purple"] as const;

export default function MetaInfo({ target, deadline, tags }: MetaInfoProps) {
  return (
    <dl className="flex flex-col gap-4 mt-6">
      <div className="flex items-center gap-2">
        <dt className="flex items-center gap-1">
          <Image
            src="/icons/modal/flag.svg"
            alt="target"
            width={18}
            height={18}
          />
          <span className="text-sm font-medium text-gray-400">목표</span>
        </dt>
        <dd className="text-sm text-gray-700">{target}</dd>
      </div>
      <div className="flex items-center gap-2">
        <dt className="flex items-center gap-1">
          <Image
            src="/icons/modal/calendar.svg"
            alt="deadline"
            width={18}
            height={18}
          />
          <span className="text-sm font-medium text-gray-400">마감기한</span>
        </dt>
        <dd className="text-sm text-gray-700">{deadline}</dd>
      </div>
      <div className="flex items-center gap-2">
        <dt className="flex items-center gap-1">
          <span className="text-base font-semibold text-gray-400">#</span>
          <span className="text-sm font-medium text-gray-400">태그</span>
        </dt>
        <dd className="flex items-center gap-1">
          {tags.map((tag, index) => (
            <Badge key={tag} variant={tagVariants[index % tagVariants.length]}>
              {tag}
            </Badge>
          ))}
        </dd>
      </div>
    </dl>
  );
}
