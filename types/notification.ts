export interface NotificationCommentData {
  postTitle?: string;
  commentContent?: string;
  commentAuthor?: string;
  userImage?: string | null;
}

export interface NotificationTodoData {
  todoTitle?: string;
  goalTitle?: string;
  userImage?: string | null;
}

export interface NotificationItemType {
  id: number;
  teamId: string;
  userId: number;
  type: "comment" | "todo";
  message: string;
  data: NotificationCommentData | NotificationTodoData | null;
  isRead: boolean;
  resourceId: number | null;
  createdAt: string;
}
