"use client";

import { useState } from "react";
import { NotificationItemType } from "@/types/notification";

const MOCK_NOTIFICATIONS: NotificationItemType[] = [
  {
    id: 1,
    teamId: "team1",
    userId: 1,
    type: "todo",
    message: "[실제 디자인 시스템 사례 조사]의 마감일이 하루 남았어요!",
    data: {
      todoTitle: "실제 디자인 시스템 사례 조사",
      goalTitle: "디자인 시스템 연구",
      userImage: null,
    },
    isRead: false,
    resourceId: 101,
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    teamId: "team1",
    userId: 1,
    type: "comment",
    message: "김민서님이 댓글을 남겼어요.",
    data: {
      postTitle: "AI 공부는 꼭 필요한 것 같아요",
      commentContent: "AI 공부는 꼭 필요한 것 같아요",
      commentAuthor: "김민서",
      userImage: null,
    },
    isRead: false,
    resourceId: 201,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
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
    resourceId: 102,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    teamId: "team1",
    userId: 1,
    type: "comment",
    message: "딸기님이 댓글을 남겼어요.",
    data: {
      postTitle: "목표 세우기",
      commentContent: "정말 멋진 목표네요!",
      commentAuthor: "딸기",
      userImage: null,
    },
    isRead: true,
    resourceId: 202,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    teamId: "team2",
    userId: 1,
    type: "comment",
    message: "김민서님이 댓글을 남겼어요.",
    data: {
      postTitle: "게시글제목",
      commentContent: "테스트댓글",
      commentAuthor: "김민서",
      userImage: null,
    },
    isRead: false,
    resourceId: 301,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
];

export function useNotificationState() {
  const [notifications, setNotifications] =
    useState<NotificationItemType[]>(MOCK_NOTIFICATIONS);

  const hasUnread = notifications.some((n) => !n.isRead);

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return {
    notifications,
    hasUnread,
    handleMarkAsRead,
    handleMarkAllAsRead,
  };
}
