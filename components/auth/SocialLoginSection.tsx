import { SocialButton } from "@/components/common/SocialButton";

interface SocialLoginSectionProps {
  label: string;
  onClickGoogle: () => void;
  onPrepareGoogle: () => void;
  isGooglePending: boolean;
}

export function SocialLoginSection({
  label,
  onClickGoogle,
  onPrepareGoogle,
  isGooglePending,
}: SocialLoginSectionProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full items-center gap-2">
        <span className="h-px flex-1 bg-gray-200 dark:bg-border" />
        <span className="whitespace-nowrap text-xs text-gray-400 dark:text-muted-foreground md:text-sm">
          {label}
        </span>
        <span className="h-px flex-1 bg-gray-200 dark:bg-border" />
      </div>
      <div className="flex items-center justify-center gap-4">
        <SocialButton
          provider="google"
          onClick={onClickGoogle}
          onMouseEnter={onPrepareGoogle}
          onFocus={onPrepareGoogle}
          disabled={isGooglePending}
        />
      </div>
    </div>
  );
}
