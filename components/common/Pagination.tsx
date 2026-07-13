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
    <>
      {/* 데스크탑, 태블릿 */}
      <PaginationView
        boxClassName="h-12 w-12 rounded-2xl text-sm"
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
        className="hidden sm:flex"
      />
      {/* 모바일 */}
      <PaginationView
        boxClassName="h-8 w-8 rounded-lg text-xs"
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
        className="flex sm:hidden"
      />
    </>
  );
}

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
        className={`flex items-center justify-center bg-gray-50 ${boxClassName} ${
          isPrevDisabled ? "cursor-default" : "cursor-pointer"
        }`}
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
              className={`flex items-center justify-center bg-gray-50 ${boxClassName}`}
            >
              <EllipsisIcon className="h-6 w-6 text-gray-400" />
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center ${boxClassName} ${
                page === currentPage
                  ? "bg-orange-500 text-white font-semibold shadow-[0px_10px_40px_0px_rgba(255,158,89,0.3)]"
                  : "bg-gray-50 text-gray-500 font-medium cursor-pointer"
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
        className={`flex items-center justify-center bg-gray-50 ${boxClassName} ${
          isNextDisabled ? "cursor-default" : "cursor-pointer"
        }`}
        aria-label="다음 페이지"
      >
        <ChevronRightIcon
          className={`h-5 w-5 ${isNextDisabled ? "text-gray-400" : "text-gray-500"}`}
        />
      </button>
    </nav>
  );
}
