const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const getNotificationUserImage = (data: unknown): string | null =>
  isRecord(data) && typeof data.userImage === "string" ? data.userImage : null;

export const getNotificationCommentContent = (data: unknown): string | null =>
  isRecord(data) && typeof data.commentContent === "string"
    ? data.commentContent
    : null;
