import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 상대 시간 포맷팅 함수
export function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffMinutes < 1) return "방금 전";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 7) return `${diffDays}일 전`;
  return `${diffWeeks}주 전`;
}

// id 기준 유저 프로필 매칭 함수
const DEFAULT_AVATARS = [
  "/images/common/profile-1.png",
  "/images/common/profile-2.png",
  "/images/common/profile-3.png",
];

export function getDefaultAvatar(id: number): string {
  return DEFAULT_AVATARS[id % DEFAULT_AVATARS.length];
}
