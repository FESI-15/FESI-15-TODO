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
