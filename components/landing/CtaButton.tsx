"use client";

import Link from "next/link";
import { m } from "motion/react";
import { buttonVariants } from "@/components/common/Button";
import { cn } from "@/utils/cn";

export function CtaButton() {
  return (
    <m.div
      className="inline-block w-33.5 md:w-55.75"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        href="/login"
        className={cn(
          buttonVariants({ hierarchy: "primary", size: "lg" }),
          "w-full shadow-[0px_10px_40px_0px_rgba(255,158,89,0.4)]",
        )}
      >
        시작하기
      </Link>
    </m.div>
  );
}
