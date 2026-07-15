interface TitleProps {
  children: React.ReactNode;
  essential?: boolean;
}
export default function Title({ children, essential = false }: TitleProps) {
  return (
    <div className="flex items-center gap-px">
      <p className="text-sm font-semibold text-gray-700">{children}</p>
      {essential && (
        <span className="text-orange-500 text-sm font-semibold">*</span>
      )}
    </div>
  );
}
