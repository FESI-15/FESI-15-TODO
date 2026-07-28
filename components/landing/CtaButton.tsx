import Link from "next/link";
import { buttonVariants } from "@/components/common/Button";
import { cn } from "@/utils/cn";

export function CtaButton() {
  return (
    <Link
      href="/login"
      className={cn(
        buttonVariants({ hierarchy: "primary", size: "lg" }),
        "w-33.5 shadow-[0px_10px_40px_0px_rgba(255,158,89,0.4)] md:w-55.75",
      )}
    >
      시작하기
    </Link>
  );
}
