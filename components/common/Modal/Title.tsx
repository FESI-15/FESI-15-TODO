import { cva } from "class-variance-authority";

interface TitleProps {
  children: React.ReactNode;
  essential?: boolean;
  marginBottom?: boolean;
}

const variants = cva("flex items-center gap-px", {
  variants: {
    marginBottom: {
      true: "mb-2",
      false: "mb-0",
    },
  },
});

export default function Title({
  children,
  essential = false,
  marginBottom = false,
}: TitleProps) {
  return (
    <div className={variants({ marginBottom })}>
      <p className="text-sm font-semibold text-gray-700">{children}</p>
      {essential && (
        <span className="text-orange-500 text-sm font-semibold">*</span>
      )}
    </div>
  );
}
