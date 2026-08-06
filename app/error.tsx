"use client";

import { useEffect } from "react";
import { Button } from "@/components/common/Button";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-8 py-[120px]">
      <h1 className="text-2xl font-semibold text-black">문제가 발생했습니다</h1>
      <p className="text-base text-gray-500">
        일시적인 오류이거나 로그인이 만료되었을 수 있어요.
      </p>
      <div className="flex gap-3">
        <Button hierarchy="secondary" onClick={reset}>
          다시 시도
        </Button>
        <Link
          href="/login"
          className="text-sm md:text-lg font-semibold text-white bg-orange-600 px-4 py-3 md:px-4.5 md:py-3.5 rounded-full"
        >
          로그인하기
        </Link>
      </div>
    </div>
  );
}
