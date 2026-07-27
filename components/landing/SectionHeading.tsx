import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  subtitle: string;
  title: string | string[];
  as?: "h1" | "h2";
  align?: "center" | "right";
}

export function SectionHeading({
  subtitle,
  title,
  as: Heading = "h2",
  align = "center",
}: SectionHeadingProps) {
  const isRight = align === "right";
  const titleLines = Array.isArray(title) ? title : [title];

  return (
    <div
      className={cn(
        "flex flex-col",
        isRight
          ? "items-end gap-3 text-right md:gap-6"
          : "items-center gap-1 text-center md:gap-3 lg:gap-4.5",
      )}
    >
      <p className="text-base leading-6 font-semibold tracking-[-0.03em] text-orange-600 md:text-2xl md:leading-8 lg:text-[30px] lg:leading-9">
        {subtitle}
      </p>
      <Heading
        className={cn(
          "text-xl leading-7.5 font-bold tracking-[-0.03em] text-gray-700 md:text-4xl md:leading-11 lg:text-5xl lg:leading-13",
          titleLines.length > 1 &&
            (isRight
              ? "flex flex-col items-end gap-2 lg:gap-4.5"
              : "flex flex-col items-center gap-2 lg:gap-4.5"),
        )}
      >
        {titleLines.length > 1
          ? titleLines.map((line) => <span key={line}>{line}</span>)
          : title}
      </Heading>
    </div>
  );
}
