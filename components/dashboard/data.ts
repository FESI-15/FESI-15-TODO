import type { DashboardGoal } from "@/components/dashboard/types";

export const DASHBOARD_GOALS: DashboardGoal[] = [
  {
    id: 1,
    title: "디자인 시스템 정복하기",
    progress: 86,
    todos: [
      { id: 1, title: "강의 내용을 Notion이나 문서에 요약 정리", link: true },
      {
        id: 2,
        title: "실제 디자인 시스템 사례 조사 (예: Polaris, Carbon 등)",
        favorite: true,
      },
      {
        id: 3,
        title: "디자인 시스템 기초3 듣기",
        note: true,
        link: true,
      },
      {
        id: 4,
        title: "디자인 시스템 심화과정 실습하기",
        note: true,
        favorite: true,
      },
    ],
    dones: [
      {
        id: 5,
        title: "디자인 토큰(token)의 역할 정리하기",
        done: true,
        note: true,
        link: true,
        favorite: true,
      },
      { id: 6, title: "Variants, Auto Layout 실습", done: true, note: true },
      {
        id: 7,
        title: "컴포넌트, 패턴, 템플릿의 차이 구분하기",
        done: true,
      },
      { id: 8, title: "수강 후 핵심 키워드 정리하기", done: true, note: true },
      { id: 9, title: "디자인 시스템의 정의 정리", done: true, link: true },
    ],
  },
  {
    id: 2,
    title: "자바스크립트로 웹 서비스 만들기",
    progress: 64,
    todos: [
      { id: 10, title: "사용자 데이터 렌더링 구현", note: true, link: true },
      {
        id: 11,
        title: "개발 폴더 구조 세팅 (src, public, components)",
        active: true,
        link: true,
      },
      {
        id: 12,
        title: "자바스크립트 기초 챕터4 듣기",
        note: true,
        link: true,
      },
      { id: 13, title: "오류/로딩 상태 처리하기", note: true },
      { id: 14, title: "JSON 서버 또는 mock API 연동", note: true },
    ],
    dones: [
      {
        id: 15,
        title: "로그인/회원가입 폼 만들기",
        done: true,
        note: true,
        link: true,
      },
      {
        id: 16,
        title: "JavaScript로 동적 인터랙션 추가",
        done: true,
        note: true,
      },
      {
        id: 17,
        title: "자바스크립트 기초 챕터2 듣기",
        done: true,
        note: true,
        link: true,
      },
      {
        id: 18,
        title: "자바스크립트 기초 챕터1 듣기",
        done: true,
        note: true,
        link: true,
      },
    ],
  },
];
