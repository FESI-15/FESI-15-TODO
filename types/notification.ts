import type { GetTeamIdNotifications200NotificationsItem } from "@/apis/model";

interface NotificationCommentData {
  postTitle: string;
  commentContent: string;
  commentAuthor: string;
  userImage: string | null;
}

interface NotificationTodoData {
  todoTitle: string;
  goalTitle: string | null;
  userImage: string | null;
}

interface NotificationGoalData {
  goalTitle: string;
  totalTodos: number;
  userImage: string | null;
}

type NotificationBase = Omit<
  GetTeamIdNotifications200NotificationsItem,
  "type" | "data"
>;

export type Notification =
  | (NotificationBase & { type: "comment"; data: NotificationCommentData })
  | (NotificationBase & { type: "todo"; data: NotificationTodoData })
  | (NotificationBase & { type: "goal"; data: NotificationGoalData });
