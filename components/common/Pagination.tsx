import ChevronLeftIcon from "@/public/icons/pagination/chevron-left.svg";
import ChevronRightIcon from "@/public/icons/pagination/chevron-right.svg";
import {
  ELLIPSIS,
  SIBLING_COUNT_DESKTOP,
  SIBLING_COUNT_MOBILE,
} from "@/constants/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | typeof ELLIPSIS;

// 페이지 번호 배열 계산 함수
const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PageItem[] => {
  const totalNumbers = siblingCount * 2 + 3; // 생략 없이 다 보여줄 수 있는 최대 개수

  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1); // 왼쪽 보여줄 개수
  const rightSibling = Math.min(currentPage + siblingCount, totalPages); // 오른쪽 보여줄 개수

  const showLeftEllipsis = leftSibling > 2; // 왼쪽 ... 필요한지 여부
  const showRightEllipsis = rightSibling < totalPages - 1; // 오른쪽 ... 필요한지 여부

  // 페이지 번호 배열
  const pages: PageItem[] = [1];

  if (showLeftEllipsis) {
    pages.push(ELLIPSIS);
  }

  for (let page = leftSibling; page <= rightSibling; page += 1) {
    if (page !== 1 && page !== totalPages) {
      pages.push(page);
    }
  }

  if (showRightEllipsis) {
    pages.push(ELLIPSIS);
  }

  pages.push(totalPages);

  return pages;
};
