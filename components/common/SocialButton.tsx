import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";
import GoogleIcon from "@/public.icons/common/google.svg";
import KakaoIcon from "@/public/icons/common/kakao.svg";

const socialButtonVariants = cva(
  "flex items-center justify-center w-14 h-14 p-3 rounded-full",
  {
    variants: {
      provider: {
        google: "bg-white border border-[#DDDDDD]",
        kakao: "bg-[#FFEE01]",
      },
    },
  },
);

interface SocialButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof socialButtonVariants> {
  provider: "google" | "kakao";
}

export function SocialButton({
  provider,
  className,
  ...props
}: SocialButtonProps) {
  return (
    <button
      type="button"
      className={cn(socialButtonVariants({ provider }), className)}
      {...props}
    >
      {provider === "google" && <GoogleIcon className="w-6 h-6" />}
      {provider === "kakao" && <KakaoIcon className="w-6 h-6" />}
    </button>
  );
}
