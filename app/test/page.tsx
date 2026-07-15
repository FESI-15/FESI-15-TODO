"use client";

import { useState } from "react";
import { Notification } from "@/components/common/notification/Notification";
import { NotificationItemType } from "@/types/notification";
import SideMenuBell from "@/components/layout/SideMenu/SideMenuContainer/SideMenuBell/SideMenuBell";

const MOCK_NOTIFICATIONS: NotificationItemType[] = [
  {
    id: 1,
    teamId: "team1",
    userId: 1,
    type: "goal",
    message: "[실제 디자인 시스템 사례 조사]의 마감일이 하루 남았어요!",
    data: {
      goalTitle: "실제 디자인 시스템 사례 조사",
      totalTodos: 5,
      userImage: null,
    },
    isRead: false,
    resourceId: null,
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2분 전
  },
  {
    id: 2,
    teamId: "team1",
    userId: 2,
    type: "comment",
    message: "김민서님이 댓글을 남겼어요.",
    data: {
      postTitle: "AI 공부는 꼭 필요한 것 같아요",
      commentContent: "AI 공부는 꼭 필요한 것 같아요",
      commentAuthor: "김민서",
      userImage: "https://picsum.photos/seed/kim/100",
    },
    isRead: false,
    resourceId: null,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1시간 전
  },
  {
    id: 3,
    teamId: "team1",
    userId: 1,
    type: "todo",
    message: "[자바스크립트 기초 챕터4 듣기]의 마감일이 하루 남았어요!",
    data: {
      todoTitle: "자바스크립트 기초 챕터4 듣기",
      goalTitle: "자바스크립트로 웹 서비스 만들기",
      userImage: null,
    },
    isRead: false,
    resourceId: null,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3일 전
  },
  {
    id: 4,
    teamId: "team1",
    userId: 3,
    type: "comment",
    message: "딸기님이 댓글을 남겼어요.",
    data: {
      postTitle: "목표 세우기",
      commentContent: "정말 멋진 목표네요!",
      commentAuthor: "딸기",
      userImage: "https://picsum.photos/seed/strawberry/100",
    },
    isRead: true,
    resourceId: null,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2주 전
  },
];

export default function TestNotificationPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="flex justify-end p-10">
      <Notification
        trigger={<button type="button">테스트 벨</button>}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </div>
  );
}
