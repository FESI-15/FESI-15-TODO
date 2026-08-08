export default function ListCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-card rounded-[24px] p-4 mt-3 min-h-[640px] md:min-h-[800px] flex flex-col">
      {children}
    </div>
  );
}
