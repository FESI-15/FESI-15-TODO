import { SocialButton } from "@/components/common/SocialButton";

interface SocialLoginSectionProps {
  label: string;
  onClickGoogle: () => void;
  isGooglePending: boolean;
  className?: string;
}

export function SocialLoginSection({
  label,
  onClickGoogle,
  isGooglePending,
  className,
}: SocialLoginSectionProps) {
  return (
    <div className={className}>
      <div className="flex w-full items-center gap-2">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="whitespace-nowrap text-xs text-gray-400 md:text-sm">
          {label}
        </span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>
      <div className="flex items-center justify-center gap-4">
        <SocialButton
          provider="google"
          onClick={onClickGoogle}
          disabled={isGooglePending}
        />
        <SocialButton provider="kakao" />
      </div>
    </div>
  );
}
