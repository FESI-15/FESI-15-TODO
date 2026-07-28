# 마이페이지 - 내 정보 관리 설계

Figma: `내 정보 관리` 섹션, node `13460:62915` (파일 `0IkM9YTgD0h4KdlUpclGiB`). 입력완료 상태 데스크톱 프레임(`13460:62988`)에서 `get_design_context`로 실제 레퍼런스 코드 확인 완료.

## 목표

로그인한 사용자가 프로필 이미지, 이름, 비밀번호를 조회/수정할 수 있는 `/mypage` 페이지를 만든다.

## 범위

- 프로필 이미지 변경, 이름 변경(닉네임 중복 실시간 확인 포함), 비밀번호 변경
- 저장 성공/실패 피드백 (토스트). 클라이언트 검증 에러와 닉네임 중복확인 힌트는 필드 아래 인라인으로 별도 처리
- 범위 밖: 회원 탈퇴(계정 삭제) UI — 이번 Figma 섹션에 포함되지 않음

## 라우트 & 파일 구조

```
app/(with-header)/mypage/page.tsx        # 서버 컴포넌트, getUserMeQueryOptionsServer prefetch 후 HydrationBoundary
components/mypage/
  MyPageInfo.tsx                          # 폼 컨테이너 (client), react-hook-form + zod
  ProfileImageInput.tsx                   # 원형 아바타 + 연필 아이콘 오버레이 업로드 UI
public/icons/mypage/
  ic_checkbox.svg                         # 기존 public/icons/landing/ic_checkbox.svg를 stroke="currentColor"로 수정해 재사용
```

`app/(with-header)` 라우트 그룹의 `layout.tsx`가 이미 `SideMenu`를 렌더링하므로 이 그룹 하위에 둔다 (대시보드와 동일 패턴). 그룹은 URL에 영향 없으므로 최종 경로는 `/mypage`. `constants/auth.ts`의 `PROTECTED_PATHS`에 `/mypage`가 이미 등록되어 있어 별도 미들웨어 설정 불필요.

## 데이터 레이어 (기존 것 재사용, 신규 API 없음)

- `useGetUserMe` — 초기값 로드 (`hooks/queries/users/users.bff.hook.ts`)
- `usePatchUserMe` — 이름/이미지 저장
- `usePatchUserPassword` — 비밀번호 변경
- `useGetUsersCheckNickname` — 이름 입력 시 실시간 중복확인 (이 기능을 실제로 사용하는 첫 번째 화면)
- `useImageUpload` / `usePostImages` — 이미지 업로드 로직 (`ImageUploadInput`에서 쓰던 것과 동일 로직을 `ProfileImageInput`에서도 사용)

## 폼 구성

react-hook-form 하나로 아래 필드를 관리:

| 필드 | 컴포넌트 | 비고 |
|---|---|---|
| image | `ProfileImageInput` (신규) | 원형 미리보기(132px) + 연필 아이콘 배지(주황 `#FF8442`, 35.5px, 아이콘은 `public/icons/modal/ic_pencil.svg` 재사용), 업로드 로직은 기존 훅 재사용 |
| email | `FormInput` (재사용) | `readOnly`, 배경 `bg-[#FAFAFA]`로 다른 input과 시각적으로 구분 (Figma 실측값) |
| name | `FormInput` (재사용) | `useGetUsersCheckNickname`을 디바운스(400ms)로 호출, 힌트 텍스트 색상 `text-[#009D97]` (Figma 실측값, 기존 토큰 없어 arbitrary value 사용) |
| currentPassword / newPassword / confirmPassword | `FormInput variant="password"` (재사용) | 선택 입력 — 아래 검증 참고 |

버튼은 화면 전체에 1개("저장하기" — Figma 실제 라벨), Figma 디자인과 동일.

### zod 검증

- `name`: 1~20자
- 비밀번호 3필드: 기본 `optional`. `superRefine`으로 — 셋 다 비어있으면 통과, 하나라도 채워지면 `currentPassword` 필수 + `newPassword` 8~72자 + `confirmPassword`가 `newPassword`와 일치해야 함
  - 불일치 에러 메시지는 `components/auth/authForm.types.ts`의 `signupSchema`와 동일하게 `"비밀번호가 일치하지 않습니다"` 문구를 재사용 (필드 아래 인라인, `FieldError`)
  - 에러 상태 색상은 Figma 실측값 `#FF3434`인데, 이미 `globals.css`에 `--color-red-500: #ff3434`로 정의되어 있고 [DateInput.tsx](../../../components/common/input/DateInput.tsx)가 `FieldError`에 `text-red-500`을 오버라이드해서 쓰는 것과 동일한 패턴 — `field.tsx` 기본 `text-destructive`(다른 색)가 아니라 이 패턴을 따라 `text-red-500`/`border-red-500`으로 맞춘다
- `confirmPassword`는 프론트 전용 필드, API에는 전송하지 않음

## 제출 흐름

1. 저장 버튼 클릭 → 변경된 필드 판단 (name/image 변경 여부, 비밀번호 3필드 입력 여부). 버튼은 항상 활성화 상태(비활성화하지 않음)
2. 변경된 게 하나도 없으면 → 실행할 mutation이 없으므로 그대로 실패 토스트 "저장이 실패하였습니다"를 띄우고 종료 (별도의 "변경사항 없음" 메시지를 새로 만들지 않고 기존 실패 토스트 재사용)
3. 변경된 게 있으면 필요한 mutation만 `Promise.allSettled`로 병렬 실행 (`usePatchUserMe`, `usePatchUserPassword`)
4. 성공한 mutation이 있으면 → `usersKeys.me()` invalidate (실제로 반영된 변경사항을 화면에 즉시 보여주기 위함)
5. 토스트는 결과 전체를 보고 하나만 띄운다: 실행한 mutation이 전부 성공 → 성공 토스트 "저장이 완료되었습니다" / 하나라도 실패(부분 실패 포함) → 실패 토스트 "저장이 실패하였습니다"
   - 성공/실패 메시지를 조합하거나 구체적인 서버 에러 문구를 넣지 않는다 — 고정 문구 하나씩만 사용
   - OAuth 가입 유저가 비밀번호 변경을 시도해 API가 400/401을 반환하는 경우도 이 경로로 동일하게 처리 (별도 분기 없음 — API는 OAuth 여부를 응답에 노출하지 않으므로 프론트에서 사전 판단 불가)
   - 필드별 인라인 에러 메시지는 만들지 않는다 (클라이언트 zod 검증 에러, 닉네임 중복확인 힌트는 예외 — 이건 API 제출과 무관하게 계속 인라인)

## 토스트

shadcn/ui의 Toast 컴포넌트를 **Base UI 구현체**로 설치한다 (`pnpm dlx shadcn@latest add toast`).

- 이 프로젝트는 이미 `@base-ui/react`로 `Dialog`, `Popover` 등을 구성하고 있어 (`components/ui/dialog.tsx`, `components/ui/popover.tsx`) Radix/React Aria 대신 Base UI를 선택하면 새 런타임 의존성 추가 없이 기존 컴포넌트들과 동일한 패턴으로 들어간다.
- 설치 후 생성되는 `components/ui/toast.tsx` (또는 shadcn이 생성하는 파일명)를 스타일만 Figma 스펙에 맞게 커스텀. 성공/실패 두 variant를 만든다:
  - **성공**: pill 모양, 배경 `#FFF8E4`, `border-radius: 28px`, 체크 아이콘(`ic_checkbox`, `#EF6C00`) + 텍스트 "저장이 완료되었습니다" (14px semibold, `#EF6C00`) — Figma 스펙 그대로
  - **실패**: 같은 pill 모양/위치/크기, 색상만 프로젝트 기존 에러 팔레트([Badge](../../../components/common/Badge.tsx)의 `red` variant와 동일: 배경 `#FEF3F2`, 텍스트 `#B42318`) + 텍스트 "저장이 실패하였습니다" — Figma에 참고할 디자인이 없어 기존 에러 색상 언어를 그대로 가져옴
  - "N초전" 같은 실시간 타이머 텍스트는 넣지 않는다 (Figma엔 있었지만 범위에서 제외)
- 노출 조건: 제출 흐름의 4번 규칙대로 성공/실패 토스트 중 하나만 노출 (동시에 둘 다 뜨지 않음)
- 4초 후 자동으로 사라짐 (Toast 컴포넌트의 duration 옵션 사용)
- 루트 레이아웃에 `<Toaster />` 1회 추가

## 아이콘

- `ic_pencil`: 이미 `public/icons/modal/ic_pencil.svg`로 존재 (흰색 fill, 21x21, 원형 배지 위에 얹히는 용도) — 새로 export하지 않고 그대로 재사용
- `ic_checkbox`: 기존 `public/icons/landing/ic_checkbox.svg`는 `stroke="white"`로 하드코딩되어 배경 도형 위에 얹히는 용도라 그대로 재사용 불가. `stroke="currentColor"`로 수정한 버전을 `public/icons/mypage/ic_checkbox.svg`로 저장해 토스트에서 사용

## 테스트 관점

- zod 스키마 단위 테스트: 비밀번호 3필드 조건부 검증 (일부만 채운 경우 에러, 모두 비운 경우 통과, 모두 채운 경우 일치 검증)
- `MyPageInfo` 제출 흐름: 이름만 변경/비밀번호만 변경/둘 다 변경/변경 없음 각 케이스에서 어떤 mutation이 호출되는지
- 전부 성공 → 성공 토스트만 뜨는지, 하나라도 실패(부분 실패 포함) → 실패 토스트만 뜨는지 (성공 토스트와 동시에 뜨지 않는지)
- 부분 실패(예: 이름 성공, 비밀번호 실패) 시에도 성공한 부분은 `usersKeys.me()`에 반영되는지
