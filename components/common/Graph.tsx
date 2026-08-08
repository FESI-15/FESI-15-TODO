interface GraphProps {
  className: string;
  value: number;
}

export default function Graph({ className, value }: GraphProps) {
  return (
    <svg className={className} viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        className="stroke-black/15 dark:stroke-white/15"
        strokeWidth="16"
      />
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        className="stroke-white dark:stroke-[#56ffff]"
        strokeWidth="16"
        strokeLinecap="round"
        strokeDasharray={2 * Math.PI * 46}
        strokeDashoffset={2 * Math.PI * 46 * (1 - value)}
        transform="rotate(-90 60 60)"
      />
    </svg>
  );
}
