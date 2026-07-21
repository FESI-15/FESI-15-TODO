# AGENTS.md

## Project Overview

이 프로젝트는 Next.js 기반 Todo 애플리케이션입니다.  
모든 작업은 기존 폴더 구조와 개발 컨벤션을 따라 진행합니다.

## Tech Stack

- Next.js 16 (App Router 사용, Pages Router 아님)
- React 19
- TanStack Query 5 (React Query)
- shadcn/ui 사용
- Tailwind CSS 4
- Zod 4 — **사용자 입력 유효성 검증 용도로만 사용** (그 외 범용 스키마/타입 생성 용도로 임의 확장하지 않는다)

> AI가 학습 시점 기준 최신 버전으로 임의 추정하지 않도록, 코드 생성 시 위 버전을 기준으로 작성한다.

## Directory Structure

```text
app/                # 라우팅
components/
  common/           # 2개 이상 컴포넌트에서 쓰이는 공통 컴포넌트
  layout/           # header, footer, nav 등 레이아웃 컴포넌트
  mypage/           # 마이페이지 전용 컴포넌트
  search/           # 검색 페이지 전용 컴포넌트
  …feature/          # 도메인(페이지) 전용 컴포넌트. 예: components/notes, components/goals
hooks/              # 커스텀 훅
apis/               # API 요청 함수
types/              # 타입 정의
constants/          # 상수
utils/              # 2곳 이상에서 쓰이는 유틸 함수
public/             # 정적 파일
```

## Coding Conventions

- Prettier를 적용한다.
- 일반 함수는 const 함수 표현식을 사용한다.
- React 컴포넌트는 function 선언을 사용한다.
- Props 타입은 interface를 사용한다.
- any 사용을 지양하고 unknown을 우선한다.
- 타입 단언(as)은 꼭 필요한 경우에만 사용한다.
- 문자열 리터럴과 매직 넘버는 상수로 관리한다.
- 2곳 이상에서 사용하는 함수는 utils로 분리한다.
- 2개 이상 페이지에서 사용하는 컴포넌트는 `components/common`에 둔다.
- 특정 페이지에서만 사용하는 컴포넌트는 해당 도메인 폴더에 둔다.
- 배럴 파일은 생성하지 않는다.
- 컴파운드 패턴은 사용하지 않는다.

## Agent Guidelines

- 요청 범위만 구현하고 기존 코드를 최대한 유지한다.
- 구현 전에 요구사항과 가정을 확인하고, 애매한 사항은 추측하지 말고 질문한다.
- 기존 코드 스타일과 폴더 구조를 따른다.
- 불필요한 리팩토링이나 추상화를 하지 않는다.
- 같은 패턴이 3번 이상 반복될 때만 추상화를 고려한다.
- 사용자가 요청하지 않은 라이브러리는 추가하지 않는다.
- 타입 안정성을 유지한다.
- 변경 후 가능한 경우 테스트, 타입 체크, 빌드를 실행한다.
- 단순한 해결책이 있다면 불필요하게 복잡한 구조를 만들지 않는다.
- 파일 생성 전에 비슷한 로직 있으면 찾아보고 작성한다.

## Component Reuse Rules

- UI 구현 전 `components/common/`, `components/ui/`, `components/layout/`, `public/icons/`를 먼저 확인한다.
- 기존 컴포넌트가 있으면 새로 만들지 않고 재사용한다.
- 아이콘은 Figma 원격 URL을 직접 쓰지 않고 export한 SVG를 `public/icons/`에 저장해서 사용한다.

| 컴포넌트 (UI 요소) | Figma Node ID | 프로젝트 내 파일 경로 |
| :--- | :--- | :--- |
| **FormInput** | `13460:59015` | `components/common/input/FormInput.tsx` |
| **TagInput** | `13460:59024` | `components/common/input/TagInput.tsx` |
| **ImageUploadInput** | `13460:59075` | `components/common/input/ImageUploadInput/ImageUploadInput.tsx` |
| **Button** | `13460:59138` | `components/common/Button.tsx` |
| **SocialButton** | `13460:59303` | `components/common/SocialButton.tsx` |
| **ReadMoreButton** | `13460:59298` | `components/common/ReadMoreButton.tsx` |
| **DeleteButton** | `13460:59323` | `components/common/DeleteButton.tsx` |
| **Dropdown** | `13460:59110` | `components/common/Dropdown.tsx` |
| **PostCard** | `13460:64207` | `components/common/PostCard.tsx` |
| **NoteCard** | `13460:64172` | `components/common/NoteCard.tsx` |
