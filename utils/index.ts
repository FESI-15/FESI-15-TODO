import {
  NotificationCommentData,
  NotificationItemType,
} from "@/types/notification";
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

// 문자열(댓글 작성자 이름)을 0 ~ (max-1) 사이의 고정 인덱스 숫자로 변환하는 해시 함수
function hashStringToIndex(str: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash + str.charCodeAt(i)) % max;
  }
  return Math.abs(hash);
}

const DEFAULT_AVATARS = [
  "/images/common/profile-1.png",
  "/images/common/profile-2.png",
  "/images/common/profile-3.png",
];

// 기본 이미지 매칭 함수 (알림 도메인(todo/comment) 기준)
export function getNotificationImage(
  notification: NotificationItemType,
): string {
  const { type, data, resourceId, id } = notification;

  // 1. [할 일 알림] 도메인
  if (type === "todo") {
    // 1-1. 첨부된 이미지가 있으면 우선 사용
    if (data?.userImage) {
      return data.userImage;
    }
    // 1-2. 이미지 없는 할 일: 할 일 ID(resourceId) 기준 3개 중 고정 선택
    const targetId = resourceId ?? id;
    const index = Math.abs(targetId) % DEFAULT_AVATARS.length;
    return DEFAULT_AVATARS[index];
  }

  // 2. [댓글 알림] 도메인
  if (type === "comment") {
    // 2-1. 댓글 작성자 프로필 이미지가 있으면 우선 사용
    if (data?.userImage) {
      return data.userImage;
    }
    // 2-2. 프로필 없는 댓글 작성자: 작성자 이름(commentAuthor) 기준 3개 중 고정 선택
    const commentData = data as NotificationCommentData | null;
    if (commentData?.commentAuthor) {
      const index = hashStringToIndex(
        commentData.commentAuthor,
        DEFAULT_AVATARS.length,
      );
      return DEFAULT_AVATARS[index];
    }
    // 예외 케이스 처리 (작성자 이름 미존재 시 알림 ID 기반)
    const index = Math.abs(id) % DEFAULT_AVATARS.length;
    return DEFAULT_AVATARS[index];
  }

  return DEFAULT_AVATARS[0];
}

// 알림 타입별 서브 텍스트 가공 함수 (타입 안전성 확보)
export function getNotificationSubText(
  notification: NotificationItemType,
): string | null {
  const { type, data } = notification;

  if (!data) return null;

  // 댓글: "댓글 내용" 형태
  if (type === "comment") {
    const commentData = data as NotificationCommentData;
    if (commentData.commentContent) {
      return `"${commentData.commentContent}"`;
    }
  }

  // 할 일: 서브 텍스트 없음

  return null;
}
