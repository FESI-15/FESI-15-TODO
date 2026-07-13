"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import ChevronLeftIcon from "@/public/icons/pagination/chevron-left.svg";
import ChevronRightIcon from "@/public/icons/pagination/chevron-right.svg";
import EllipsisIcon from "@/public/icons/pagination/ellipsis.svg";
import {
  PAGE_ELLIPSIS,
  SIBLING_COUNT_DESKTOP,
  SIBLING_COUNT_MOBILE,
} from "@/constants/pagination";

// 페이지 버튼
// "size(데스크탑/모바일)"와 "selected(현재 페이지)"를 variants로 분리해서 관리
const pageButtonVariants = cva("flex items-center justify-center font-medium", {
  variants: {
    size: {
      desktop: "h-12 w-12 rounded-2xl text-sm",
      mobile: "h-8 w-8 rounded-lg text-xs",
    },
    selected: {
      true: "bg-orange-500 text-white font-semibold shadow-[0px_10px_40px_0px_rgba(255,158,89,0.3)]",
      false: "bg-gray-50 text-gray-500 cursor-pointer",
    },
  },
});
// <, > 버튼
// "size(데스크탑/모바일)"와 "disabled(비활성화)"를 variants로 분리해서 관리
const navButtonVariants = cva("flex items-center justify-center bg-gray-50", {
  variants: {
    size: {
      desktop: "h-12 w-12 rounded-2xl",
      mobile: "h-8 w-8 rounded-lg",
    },
    disabled: {
      true: "cursor-default",
      false: "cursor-pointer",
    },
  },
});

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string; // 외부에서 주는 값
}

type PageItem = number | typeof PAGE_ELLIPSIS;
type PaginationSize = "desktop" | "mobile";

// 페이지 번호 배열 계산 함수
const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PageItem[] => {
  // 결과 배열
  const pages: PageItem[] = [1];

  if (totalPages <= 1) {
    return pages;
  }

  // 양 끝에 근접했을 때 멈추도록 범위 설정
  // rangeEnd - rangeStart = siblingCount * 2
  // rangeEnd 최대: totalPages - 2
  // rangeStart 최대: totalPages - 2 - siblingCount * 2 (3보다는 작아지면 안 됨)
  const rangeStart = Math.max(
    Math.min(currentPage - siblingCount, totalPages - 2 - siblingCount * 2),
    3,
  );
  // rangeStart 최소: 3
  // rangeEnd 최소: siblingCount * 2 + 3 (totalPages - 2 보다는 커지면 안 됨)
  const rangeEnd = Math.min(
    Math.max(currentPage + siblingCount, siblingCount * 2 + 3),
    totalPages - 2,
  );

  // 왼쪽 끝 생략되는 페이지가 딱 1칸이면 ... 대신 숫자로 (2)
  if (rangeStart > 3) {
    pages.push(PAGE_ELLIPSIS);
  } else if (totalPages > 3) {
    pages.push(2);
  }

  for (let page = rangeStart; page <= rangeEnd; page += 1) {
    pages.push(page);
  }

  // 오른쪽 끝 생략되는 페이지가 딱 1칸이면 ... 대신 숫자로 (totalPages - 1)
  if (rangeEnd < totalPages - 2) {
    pages.push(PAGE_ELLIPSIS);
  } else if (totalPages > 2) {
    pages.push(totalPages - 1);
  }

  pages.push(totalPages);

  return pages;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={className}>
      {/* 데스크탑, 태블릿 */}
      <PaginationView
        size="desktop"
        isVisible="desktop"
        currentPage={currentPage}
        totalPages={totalPages}
        pageNumbers={getPageNumbers(
          currentPage,
          totalPages,
          SIBLING_COUNT_DESKTOP,
        )}
        onPageChange={onPageChange}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      {/* 모바일 */}
      <PaginationView
        size="mobile"
        isVisible="mobile"
        currentPage={currentPage}
        totalPages={totalPages}
        pageNumbers={getPageNumbers(
          currentPage,
          totalPages,
          SIBLING_COUNT_MOBILE,
        )}
        onPageChange={onPageChange}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}

interface PaginationViewProps {
  size: PaginationSize;
  isVisible: PaginationSize;
  currentPage: number;
  totalPages: number;
  pageNumbers: PageItem[];
  onPageChange: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

function PaginationView({
  size,
  isVisible,
  currentPage,
  totalPages,
  pageNumbers,
  onPageChange,
  onPrev,
  onNext,
}: PaginationViewProps) {
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const navClassName = twMerge(
    clsx(
      "items-center gap-2.5",
      isVisible === "desktop" ? "hidden sm:flex" : "flex sm:hidden",
    ),
  );

  return (
    <nav className={navClassName} aria-label="pagination">
      <button
        type="button"
        onClick={onPrev}
        disabled={isPrevDisabled}
        className={navButtonVariants({ size, disabled: isPrevDisabled })}
        aria-label="이전 페이지"
      >
        <ChevronLeftIcon
          className={clsx(
            "h-5 w-5",
            isPrevDisabled ? "text-gray-400" : "text-gray-500",
          )}
        />
      </button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) =>
          page === PAGE_ELLIPSIS ? (
            <span
              key={`PAGE_ELLIPSIS-${index}`}
              className={twMerge(
                pageButtonVariants({ size, selected: false }),
                "cursor-default",
              )}
            >
              <EllipsisIcon className="h-6 w-6 text-gray-400" />
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={twMerge(
                pageButtonVariants({ size, selected: page === currentPage }),
              )}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={isNextDisabled}
        className={navButtonVariants({ size, disabled: isNextDisabled })}
        aria-label="다음 페이지"
      >
        <ChevronRightIcon
          className={clsx(
            "h-5 w-5",
            isNextDisabled ? "text-gray-400" : "text-gray-500",
          )}
        />
      </button>
    </nav>
  );
}
