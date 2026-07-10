"use client";

import ChevronLeftIcon from "@/public/icons/pagination/chevron-left.svg";
import ChevronRightIcon from "@/public/icons/pagination/chevron-right.svg";
import EllipsisIcon from "@/public/icons/pagination/ellipsis.svg";
import {
  PAGE_ELLIPSIS,
  SIBLING_COUNT_DESKTOP,
  SIBLING_COUNT_MOBILE,
} from "@/constants/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | typeof PAGE_ELLIPSIS;

// 페이지 번호 배열 계산 함수
// 1페이지 & 마지막 페이지는 항상, 그 사이에 현재 페이지 + 양옆 siblingCount 개씩
const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PageItem[] => {
  const pages: PageItem[] = [1];

  // 가운데 보여주는 범위 (최소 2, 최대 마지막 페이지 - 1)
  const rangeStart = Math.max(currentPage - siblingCount, 2);
  const rangeEnd = Math.min(currentPage + siblingCount, totalPages - 1);

  // 앞 ... 여부
  if (rangeStart > 2) {
    pages.push(PAGE_ELLIPSIS);
  }

  for (let page = rangeStart; page <= rangeEnd; page += 1) {
    pages.push(page);
  }

  // 뒤 ... 여부
  if (rangeEnd < totalPages - 1) {
    pages.push(PAGE_ELLIPSIS);
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

interface PaginationViewProps {
  boxClassName: string;
  currentPage: number;
  totalPages: number;
  pageNumbers: PageItem[];
  onPageChange: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
  className: string;
}

function PaginationView({
  boxClassName,
  currentPage,
  totalPages,
  pageNumbers,
  onPageChange,
  onPrev,
  onNext,
  className,
}: PaginationViewProps) {
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <nav
      className={`items-center gap-2.5 ${className}`}
      aria-label="pagination"
    >
      <button
        type="button"
        onClick={onPrev}
        disabled={isPrevDisabled}
        className={`flex items-center justify-center bg-gray-50 ${boxClassName}`}
        aria-label="이전 페이지"
      >
        <ChevronLeftIcon
          className={`h-5 w-5 ${isPrevDisabled ? "text-gray-400" : "text-gray-500"}`}
        />
      </button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) =>
          page === PAGE_ELLIPSIS ? (
            <span
              key={`PAGE_ELLIPSIS-${index}`}
              className={`flex items-center justify-center ${boxClassName}`}
            >
              <EllipsisIcon className="h-6 w-6 text-gray-400" />
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center text-sm font-medium ${boxClassName} ${
                page === currentPage
                  ? "bg-orange-500 text-white"
                  : "bg-gray-50 text-gray-500"
              }`}
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
        className={`flex items-center justify-center bg-gray-50 ${boxClassName}`}
        aria-label="다음 페이지"
      >
        <ChevronRightIcon
          className={`h-5 w-5 ${isNextDisabled ? "text-gray-400" : "text-gray-500"}`}
        />
      </button>
    </nav>
  );
}
