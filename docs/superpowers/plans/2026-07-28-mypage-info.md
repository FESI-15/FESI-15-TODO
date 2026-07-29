# 마이페이지 내 정보 관리 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/mypage`에서 프로필 이미지·이름·비밀번호를 조회/수정하는 페이지를 만든다.

**Architecture:** `(with-header)` 라우트 그룹 아래 서버 컴포넌트 페이지가 `getUserMe`를 prefetch하고, 클라이언트 폼 컴포넌트(`MyPageInfo`)가 react-hook-form + zod로 입력을 관리하며 기존 users 훅(`usePatchUserMe`, `usePatchUserPassword`, `useGetUsersCheckNickname`)을 그대로 재사용한다. 저장 결과는 shadcn Toast(Base UI 구현체)로 성공/실패 고정 문구만 보여준다.

**Tech Stack:** Next.js 16 App Router, React 19, TanStack Query 5, react-hook-form, Zod, Tailwind CSS 4, shadcn/ui(Base UI), Jest + Testing Library.

## Global Constraints

- 라우트: `/mypage` (`app/(with-header)/mypage/page.tsx`)
- 저장 버튼 라벨은 정확히 "저장하기" (Figma 실측)
- 저장 버튼은 절대 비활성화하지 않는다
- 토스트 문구는 정확히 "저장이 완료되었습니다" / "저장이 실패하였습니다" 두 가지 고정 문구만 사용, 조합하지 않는다
- 토스트는 4초 후 자동으로 사라진다
- 비밀번호 불일치 에러 문구는 정확히 "비밀번호가 일치하지 않습니다" (기존 `signupSchema`와 동일 문구 재사용)
- 에러 색상은 `text-red-500`/`border-red-500` (Tailwind 기존 토큰, `#FF3434`와 일치) 사용, `field.tsx` 기본 `text-destructive` 쓰지 않음
- `confirmPassword`는 프론트 전용 필드, API에는 전송하지 않는다
- 새 npm 의존성 설치 금지 (shadcn Toast는 이미 설치된 `@base-ui/react` 구현체 선택)
- 패키지 매니저는 `npm` (이 저장소는 `package-lock.json` 사용, `pnpm`/`yarn` 아님)
- Props 타입은 interface, 일반 함수는 const 함수 표현식, 컴포넌트는 function 선언 (AGENTS.md)

전체 설계 근거는 [docs/superpowers/specs/2026-07-28-mypage-info-design.md](../specs/2026-07-28-mypage-info-design.md) 참고.

---

## File Structure

```
app/globals.css                                  # 수정: shadcn toast 설치 시 CLI가 자동 추가하는 CSS 변수 확인만
app/layout.tsx                                    # 수정: <Toaster /> 추가
components/ui/toast.tsx                           # 생성: shadcn CLI가 생성 (Base UI 구현체)
components/mypage/
  myPageForm.types.ts                              # 생성: zod 스키마 + 타입 (components/auth/authForm.types.ts와 동일 패턴)
  myPageForm.types.test.ts                         # 생성: 스키마 단위 테스트
  ProfileImageInput.tsx                            # 생성: 원형 아바타 + 연필 배지 업로드 UI
  ProfileImageInput.test.tsx                       # 생성
  MyPageInfo.tsx                                   # 생성: 폼 컨테이너, 제출 흐름
  MyPageInfo.test.tsx                              # 생성
app/(with-header)/mypage/page.tsx                 # 생성: 서버 컴포넌트, prefetch
public/icons/mypage/
  ic_checkbox.svg                                  # 생성: 기존 landing 아이콘을 currentColor로 수정
```

---

## Task 1: shadcn Toast 설치 + 성공/실패 스타일 헬퍼

**Files:**
- Create/Modify: `components/ui/toast.tsx` (shadcn CLI가 생성 — 정확한 파일명은 CLI 실행 후 확인)
- Modify: `app/layout.tsx`
- Create: `components/mypage/toast.ts`
- Create: `components/mypage/toast.test.tsx`

**Interfaces:**
- Produces: `showSaveSuccessToast(): void`, `showSaveFailureToast(): void` — Task 5(`MyPageInfo`)가 이 두 함수를 그대로 호출

- [ ] **Step 1: shadcn Toast(Base UI) 설치**

Run:
```bash
npx shadcn@latest add toast
```

프롬프트가 뜨면 구현체로 **Base UI**를 선택한다 (이미 `@base-ui/react`로 `Dialog`/`Popover`를 구성 중이므로 새 런타임 의존성이 추가되지 않는 선택지).

Expected: `components/ui/toast.tsx` (또는 CLI가 명명하는 파일)가 생성되고, `package.json`에 새 의존성이 추가되지 않는다 (`@base-ui/react`는 이미 있음). `git status`로 확인:

Run: `git status --short`
Expected: `components/ui/toast.tsx` 등 신규 파일만 보이고 `package.json`/`package-lock.json` 변경 없음 (있다면 `@base-ui/react` 버전 정합성만 확인하고 넘어간다)

- [ ] **Step 2: 생성된 Toast 컴포넌트 확인**

`components/ui/toast.tsx`를 읽어서 export되는 컴포넌트/훅 이름을 확인한다 (예: `Toaster`, `toast`). 아래 스텝들은 `toast.add({ title, description, ... })`와 `<Toaster />`가 export된다고 가정한다 — 실제 시그니처가 다르면 이후 스텝의 호출부만 맞춰 조정한다.

- [ ] **Step 3: 루트 레이아웃에 Toaster 추가**

`app/layout.tsx`를 수정:

```tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/globals.css";
import { QueryProviders } from "../providers/Queryproviders";
import LazyMotionProvider from "@/providers/LazyMotionProvider";
import { cn } from "@/utils/cn";
import { Toaster } from "@/components/ui/toast";

// ...(폰트 정의 동일)...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={cn("h-full", "antialiased", pretendard.variable, "font-sans")}
    >
      <body className="flex min-h-full flex-col font-sans bg-gray-100">
        <QueryProviders>
          <LazyMotionProvider>{children}</LazyMotionProvider>
        </QueryProviders>
        <Toaster />
      </body>
    </html>
  );
}
```

(폰트 `localFont` 블록과 `metadata` export는 기존 그대로 두고 import 한 줄과 `<Toaster />` 한 줄만 추가한다.)

- [ ] **Step 4: 성공/실패 토스트 헬퍼 작성**

Create `components/mypage/toast.ts`:

```ts
import { toast } from "@/components/ui/toast";

const TOAST_DURATION_MS = 4000;

const SUCCESS_TOAST_CLASSNAME =
  "rounded-[28px] bg-[#FFF8E4] text-[#EF6C00] text-sm font-semibold";
const FAILURE_TOAST_CLASSNAME =
  "rounded-[28px] bg-[#FEF3F2] text-[#B42318] text-sm font-semibold";

export const showSaveSuccessToast = () => {
  toast.add({
    title: "저장이 완료되었습니다",
    duration: TOAST_DURATION_MS,
    className: SUCCESS_TOAST_CLASSNAME,
  });
};

export const showSaveFailureToast = () => {
  toast.add({
    title: "저장이 실패하였습니다",
    duration: TOAST_DURATION_MS,
    className: FAILURE_TOAST_CLASSNAME,
  });
};
```

`toast.add`가 `className`을 지원하지 않는 시그니처라면(Step 2에서 확인한 실제 API 기준) 생성된 `toast.tsx`의 variant 정의를 직접 수정해서 위 두 색상(`#FFF8E4`/`#EF6C00` 성공, `#FEF3F2`/`#B42318` 실패, `border-radius: 28px`)을 적용하는 `success`/`error` variant를 추가하고, 여기서는 `toast.add({ title, duration, variant: "success" | "error" })` 형태로 호출한다.

- [ ] **Step 5: 헬퍼 테스트 작성 (실패 확인)**

Create `components/mypage/toast.test.tsx`:

```tsx
jest.mock("@/components/ui/toast", () => ({
  toast: { add: jest.fn() },
}));

import { toast } from "@/components/ui/toast";
import { showSaveSuccessToast, showSaveFailureToast } from "./toast";

describe("mypage toast helpers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows the fixed success message", () => {
    showSaveSuccessToast();

    expect(toast.add).toHaveBeenCalledWith(
      expect.objectContaining({ title: "저장이 완료되었습니다" }),
    );
  });

  it("shows the fixed failure message", () => {
    showSaveFailureToast();

    expect(toast.add).toHaveBeenCalledWith(
      expect.objectContaining({ title: "저장이 실패하였습니다" }),
    );
  });
});
```

Run: `npx jest components/mypage/toast.test.tsx`
Expected: PASS (Step 4에서 이미 구현했으므로 바로 통과 — 이 태스크는 3rd-party 코드젠에 의존해 선(先)구현 후 테스트로 확인하는 예외 케이스)

- [ ] **Step 6: Commit**

```bash
git add components/ui/toast.tsx components/mypage/toast.ts components/mypage/toast.test.tsx app/layout.tsx package.json package-lock.json
git commit -m "feat: 마이페이지 저장 성공/실패 토스트 추가"
```

---

## Task 2: 토스트용 체크 아이콘 생성

**Files:**
- Create: `public/icons/mypage/ic_checkbox.svg`

**Interfaces:**
- Produces: `public/icons/mypage/ic_checkbox.svg` — Task 4에서 성공 토스트 아이콘으로 import

- [ ] **Step 1: 기존 아이콘을 currentColor로 수정해 새 경로에 저장**

Read `public/icons/landing/ic_checkbox.svg` (내용: `stroke="white"` 하드코딩된 체크마크). `stroke="white"`를 `stroke="currentColor"`로 바꿔서 새 파일로 저장한다.

Create `public/icons/mypage/ic_checkbox.svg`:

```svg
<svg  viewBox="0 0 67 71" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.7181 32.6932L27.0477 41.9243C27.4274 42.5819 28.2683 42.8072 28.926 42.4275L46.2629 32.4181" stroke="currentColor" stroke-width="7.33333" stroke-linecap="round"/>
</svg>
```

- [ ] **Step 2: 커밋**

```bash
git add public/icons/mypage/ic_checkbox.svg
git commit -m "feat: 마이페이지 토스트용 체크 아이콘 추가"
```

---

## Task 3: 폼 zod 스키마

**Files:**
- Create: `components/mypage/myPageForm.types.ts`
- Test: `components/mypage/myPageForm.types.test.ts`

**Interfaces:**
- Produces: `myPageFormSchema: ZodSchema`, `type MyPageFormValues = { name: string; image?: string; currentPassword?: string; newPassword?: string; confirmPassword?: string }` — Task 5(`MyPageInfo`)가 `useForm<MyPageFormValues>({ resolver: zodResolver(myPageFormSchema) })`로 사용

- [ ] **Step 1: 실패하는 테스트 작성**

Create `components/mypage/myPageForm.types.test.ts`:

```ts
import { myPageFormSchema } from "./myPageForm.types";

const baseValues = {
  name: "체다치즈",
  image: undefined,
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

describe("myPageFormSchema", () => {
  it("passes when password fields are all empty", () => {
    const result = myPageFormSchema.safeParse(baseValues);

    expect(result.success).toBe(true);
  });

  it("fails when name is empty", () => {
    const result = myPageFormSchema.safeParse({ ...baseValues, name: "" });

    expect(result.success).toBe(false);
  });

  it("fails when name is longer than 20 characters", () => {
    const result = myPageFormSchema.safeParse({
      ...baseValues,
      name: "a".repeat(21),
    });

    expect(result.success).toBe(false);
  });

  it("requires currentPassword when newPassword is filled", () => {
    const result = myPageFormSchema.safeParse({
      ...baseValues,
      newPassword: "newpassword1",
      confirmPassword: "newpassword1",
    });

    expect(result.success).toBe(false);
  });

  it("fails when newPassword is shorter than 8 characters", () => {
    const result = myPageFormSchema.safeParse({
      ...baseValues,
      currentPassword: "current1",
      newPassword: "short1",
      confirmPassword: "short1",
    });

    expect(result.success).toBe(false);
  });

  it("fails with the exact mismatch message when confirmPassword differs", () => {
    const result = myPageFormSchema.safeParse({
      ...baseValues,
      currentPassword: "current1",
      newPassword: "newpassword1",
      confirmPassword: "different1",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const confirmError = result.error.issues.find((issue) =>
        issue.path.includes("confirmPassword"),
      );
      expect(confirmError?.message).toBe("비밀번호가 일치하지 않습니다");
    }
  });

  it("passes when all three password fields are valid and matching", () => {
    const result = myPageFormSchema.safeParse({
      ...baseValues,
      currentPassword: "current1",
      newPassword: "newpassword1",
      confirmPassword: "newpassword1",
    });

    expect(result.success).toBe(true);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx jest components/mypage/myPageForm.types.test.ts`
Expected: FAIL — `Cannot find module './myPageForm.types'`

- [ ] **Step 3: 스키마 구현**

Create `components/mypage/myPageForm.types.ts`:

```ts
import { z } from "zod";

const optionalPasswordField = z.string().optional().default("");

export const myPageFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "이름을 입력해주세요")
      .max(20, "이름은 20자 이하로 입력해주세요"),
    image: z.string().optional(),
    currentPassword: optionalPasswordField,
    newPassword: optionalPasswordField,
    confirmPassword: optionalPasswordField,
  })
  .superRefine((data, ctx) => {
    const hasAnyPasswordInput =
      data.currentPassword !== "" ||
      data.newPassword !== "" ||
      data.confirmPassword !== "";

    if (!hasAnyPasswordInput) {
      return;
    }

    if (data.currentPassword === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "현재 비밀번호를 입력해주세요",
        path: ["currentPassword"],
      });
    }

    if (data.newPassword.length < 8 || data.newPassword.length > 72) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호는 8자 이상 72자 이하로 입력해주세요",
        path: ["newPassword"],
      });
    }

    if (data.confirmPassword !== data.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다",
        path: ["confirmPassword"],
      });
    }
  });

export type MyPageFormValues = z.infer<typeof myPageFormSchema>;
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx jest components/mypage/myPageForm.types.test.ts`
Expected: PASS (7 tests)

- [ ] **Step 5: Commit**

```bash
git add components/mypage/myPageForm.types.ts components/mypage/myPageForm.types.test.ts
git commit -m "feat: 마이페이지 폼 zod 스키마 추가"
```

---

## Task 4: ProfileImageInput 컴포넌트

**Files:**
- Create: `components/mypage/ProfileImageInput.tsx`
- Test: `components/mypage/ProfileImageInput.test.tsx`

**Interfaces:**
- Consumes: `useImageUpload({ file, onFileChange }): { inputRef, previewUrl, handleBoxClick, handleChange, handleRemove }` (기존 `hooks/useImageUpload.ts`), `usePostImages(): { mutateAsync: (variables: { data: { fileName: string } }) => Promise<{ data: { uploadUrl: string; url: string } }> }` (기존 `hooks/queries/uploads/uploads.bff.hook.ts`)
- Produces: `<ProfileImageInput control={control} name="image" />` — Task 5(`MyPageInfo`)가 `image` 필드에 사용. `useController`로 `field.value`(string | undefined, 이미지 URL)를 관리

- [ ] **Step 1: 실패하는 테스트 작성**

Create `components/mypage/ProfileImageInput.test.tsx`:

```tsx
import { useForm } from "react-hook-form";
import { render, screen } from "@/test/test-utils";
import { ProfileImageInput } from "./ProfileImageInput";

jest.mock("@/hooks/queries/uploads/uploads.bff.hook", () => ({
  usePostImages: () => ({ mutateAsync: jest.fn() }),
}));

function Wrapper({ defaultImage }: { defaultImage?: string }) {
  const { control } = useForm({ defaultValues: { image: defaultImage } });
  return <ProfileImageInput control={control} name="image" />;
}

describe("ProfileImageInput", () => {
  it("renders a file input for uploading a profile image", () => {
    render(<Wrapper />);

    expect(screen.getByLabelText("프로필 이미지 변경")).toBeInTheDocument();
  });

  it("renders the existing image as a preview when a default value is provided", () => {
    render(<Wrapper defaultImage="https://example.com/avatar.png" />);

    const preview = screen.getByAltText("프로필 이미지 미리보기");
    expect(preview).toHaveAttribute("src", "https://example.com/avatar.png");
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx jest components/mypage/ProfileImageInput.test.tsx`
Expected: FAIL — `Cannot find module './ProfileImageInput'`

- [ ] **Step 3: 컴포넌트 구현**

Create `components/mypage/ProfileImageInput.tsx`:

```tsx
"use client";

import { InputHTMLAttributes } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import PencilIcon from "@/public/icons/modal/ic_pencil.svg";
import { useImageUpload } from "@/hooks/useImageUpload";
import { usePostImages } from "@/hooks/queries/uploads/uploads.bff.hook";
import { useState } from "react";

interface ProfileImageInputProps<T extends FieldValues>
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "defaultValue" | "name" | "onBlur" | "onChange" | "value"
  > {
  control: Control<T>;
  name: FieldPath<T>;
}

export function ProfileImageInput<T extends FieldValues>({
  control,
  name,
  ...props
}: ProfileImageInputProps<T>) {
  const { mutateAsync: postImages } = usePostImages();
  const { field } = useController({ control, name });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = async (file: File | null) => {
    setSelectedFile(file);

    if (!file) {
      field.onChange(undefined);
      return;
    }

    try {
      const { data } = await postImages({ data: { fileName: file.name } });

      const response = await fetch(data.uploadUrl, {
        method: "PUT",
        body: file,
      });

      if (!response.ok) {
        throw new Error("이미지 업로드에 실패했습니다.");
      }

      field.onChange(data.url);
    } catch {
      setSelectedFile(null);
      field.onChange(undefined);
    }
  };

  const { inputRef, previewUrl, handleBoxClick, handleChange } =
    useImageUpload({ file: selectedFile, onFileChange: handleFileChange });

  const fieldValue = typeof field.value === "string" ? field.value : undefined;
  const displayUrl = previewUrl ?? fieldValue;

  return (
    <div className="relative size-[132px] shrink-0">
      <div className="size-[132px] overflow-hidden rounded-full bg-gray-100">
        {displayUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={displayUrl}
            alt="프로필 이미지 미리보기"
            className="size-full object-cover"
          />
        )}
      </div>
      <button
        type="button"
        onClick={handleBoxClick}
        aria-label="프로필 이미지 변경"
        className="absolute bottom-0 right-0 flex size-[35.5px] items-center justify-center rounded-full bg-orange-500 p-[5px]"
      >
        <PencilIcon className="size-[20.3px] text-white" />
      </button>
      <input
        ref={(element) => {
          inputRef.current = element;
          field.ref(element);
        }}
        id={name}
        name={field.name}
        type="file"
        accept="image/*"
        className="hidden"
        onBlur={field.onBlur}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx jest components/mypage/ProfileImageInput.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/mypage/ProfileImageInput.tsx components/mypage/ProfileImageInput.test.tsx
git commit -m "feat: 프로필 이미지 원형 업로드 컴포넌트 추가"
```

---

## Task 5: MyPageInfo 폼 컴포넌트 (제출 흐름 포함)

**Files:**
- Modify: `components/common/input/FormInput.tsx` (add optional `errorClassName` prop, backward compatible)
- Create: `components/mypage/MyPageInfo.tsx`
- Test: `components/mypage/MyPageInfo.test.tsx`

**Interfaces:**
- Consumes:
  - `myPageFormSchema`, `MyPageFormValues` (Task 3)
  - `ProfileImageInput` (Task 4)
  - `showSaveSuccessToast()`, `showSaveFailureToast()` (Task 1)
  - `useGetUserMe(): { data?: { data: GetTeamIdUsersMe200 } }`, `usePatchUserMe(): { mutateAsync: (v: { data: PatchTeamIdUsersMeBody }) => Promise<unknown> }`, `usePatchUserPassword(): { mutateAsync: (v: { data: PatchTeamIdUsersMePasswordBody }) => Promise<unknown> }`, `useGetUsersCheckNickname(params: { name: string }): { data?: { data: { isAvailable?: boolean } } }` (기존 `hooks/queries/users/users.bff.hook.ts` — `useGetUsersCheckNickname`은 이번에 처음 실제로 소비하는 곳이므로 `GetTeamIdUsersCheckNickname200` 타입을 `apis/model`에서 직접 확인해서 실제 필드명으로 맞춘다)
  - `usersKeys` (기존 `hooks/queries/users/users.key.ts`)
  - `FormInput` (기존 `components/common/input/FormInput.tsx`)
  - `inputVariants` (기존 `components/common/input/Input.variants.ts`), `Field`/`FieldLabel` (기존 `components/ui/field.tsx`), `Input as ShadcnInput` (기존 `components/ui/input.tsx`) — 읽기 전용 이메일 필드를 정적으로 렌더링하는 데 사용
  - `Button` (기존 `components/common/Button.tsx`)
- Produces: `export function MyPageInfo(): JSX.Element` — Task 6(`page.tsx`)이 그대로 렌더링

- [ ] **Step 0: `GetTeamIdUsersCheckNickname200` 실제 필드명 확인**

Read `apis/model/getTeamIdUsersCheckNickname200.ts` — 아래 스텝은 필드명이 `isAvailable: boolean`이라고 가정하고 작성되어 있다. 실제 필드명이 다르면(예: `available`) 이후 스텝의 `nicknameCheck.data?.data.isAvailable` 참조를 실제 필드명으로 바꿔서 진행한다.

- [ ] **Step 1: 실패하는 테스트 작성**

Create `components/mypage/MyPageInfo.test.tsx`:

```tsx
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@/test/test-utils";
import { MyPageInfo } from "./MyPageInfo";
import { showSaveSuccessToast, showSaveFailureToast } from "./toast";

const mockUseGetUserMe = jest.fn();
const mockPatchUserMe = jest.fn();
const mockPatchUserPassword = jest.fn();

jest.mock("@/hooks/queries/users/users.bff.hook", () => ({
  useGetUserMe: () => mockUseGetUserMe(),
  usePatchUserMe: () => ({ mutateAsync: mockPatchUserMe }),
  usePatchUserPassword: () => ({ mutateAsync: mockPatchUserPassword }),
  useGetUsersCheckNickname: () => ({ data: undefined }),
}));

jest.mock("@/hooks/queries/uploads/uploads.bff.hook", () => ({
  usePostImages: () => ({ mutateAsync: jest.fn() }),
}));

jest.mock("./toast", () => ({
  showSaveSuccessToast: jest.fn(),
  showSaveFailureToast: jest.fn(),
}));

const baseUser = {
  id: 1,
  teamId: "team",
  email: "codeit@email.com",
  name: "체다치즈",
  image: null,
  createdAt: "",
  updatedAt: "",
};

describe("MyPageInfo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetUserMe.mockReturnValue({ data: { data: baseUser } });
    mockPatchUserMe.mockResolvedValue({ data: { ...baseUser, name: "스파게티" } });
    mockPatchUserPassword.mockResolvedValue({ data: { message: "ok" } });
  });

  it("shows the failure toast and calls no mutation when nothing changed", async () => {
    const user = userEvent.setup();
    render(<MyPageInfo />);

    await user.click(screen.getByRole("button", { name: "저장하기" }));

    await waitFor(() => {
      expect(showSaveFailureToast).toHaveBeenCalledTimes(1);
    });
    expect(mockPatchUserMe).not.toHaveBeenCalled();
    expect(mockPatchUserPassword).not.toHaveBeenCalled();
  });

  it("calls only usePatchUserMe when only the name changed, and shows success toast", async () => {
    const user = userEvent.setup();
    render(<MyPageInfo />);

    const nameInput = screen.getByLabelText("이름");
    await user.clear(nameInput);
    await user.type(nameInput, "스파게티");
    await user.click(screen.getByRole("button", { name: "저장하기" }));

    await waitFor(() => {
      expect(mockPatchUserMe).toHaveBeenCalledWith({
        data: { name: "스파게티" },
      });
    });
    expect(mockPatchUserPassword).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(showSaveSuccessToast).toHaveBeenCalledTimes(1);
    });
  });

  it("calls only usePatchUserPassword when only password fields are filled", async () => {
    const user = userEvent.setup();
    render(<MyPageInfo />);

    await user.type(screen.getByLabelText("현재 비밀번호"), "current123");
    await user.type(screen.getByLabelText("새 비밀번호"), "newpassword1");
    await user.type(
      screen.getByLabelText("새 비밀번호 확인"),
      "newpassword1",
    );
    await user.click(screen.getByRole("button", { name: "저장하기" }));

    await waitFor(() => {
      expect(mockPatchUserPassword).toHaveBeenCalledWith({
        data: { currentPassword: "current123", newPassword: "newpassword1" },
      });
    });
    expect(mockPatchUserMe).not.toHaveBeenCalled();
  });

  it("shows the failure toast when a mutation rejects", async () => {
    mockPatchUserMe.mockRejectedValue(new Error("서버 에러"));
    const user = userEvent.setup();
    render(<MyPageInfo />);

    const nameInput = screen.getByLabelText("이름");
    await user.clear(nameInput);
    await user.type(nameInput, "스파게티");
    await user.click(screen.getByRole("button", { name: "저장하기" }));

    await waitFor(() => {
      expect(showSaveFailureToast).toHaveBeenCalledTimes(1);
    });
    expect(showSaveSuccessToast).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx jest components/mypage/MyPageInfo.test.tsx`
Expected: FAIL — `Cannot find module './MyPageInfo'`

- [ ] **Step 3: FormInput에 에러 색상 오버라이드 옵션 추가**

`components/common/input/FormInput.tsx`는 에러 메시지를 항상 `field.tsx`의 기본 `text-destructive` 색으로 렌더링한다. 이번 비밀번호 불일치 에러는 Figma 실측값 `#FF3434`(`text-red-500`, [DateInput.tsx](../../../components/common/input/DateInput.tsx)와 동일 패턴)를 써야 하므로, 기존 호출부(로그인/회원가입 등)의 동작은 그대로 두고 선택적 prop만 추가한다.

`FormInputProps`에 필드 추가:

```ts
interface FormInputProps<T extends FieldValues> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultValue" | "name" | "onBlur" | "onChange" | "value"
> {
  control: Control<T>;
  name: FieldPath<T>;
  variant?: FormInputVariant;
  fieldClassName?: string;
  errorClassName?: string;
  label?: ReactNode;
}
```

함수 시그니처와 반환부 수정 (`errorClassName` 구조분해 추가, `FieldError`에 `className` 전달):

```tsx
export function FormInput<T extends FieldValues>({
  control,
  name,
  variant = "text",
  label,
  className,
  fieldClassName,
  errorClassName,
  type = "text",
  ...props
}: FormInputProps<T>) {
  // ...기존 로직 그대로...

  return (
    <Field data-invalid={isError} className={twMerge("gap-2", fieldClassName)}>
      {label && (
        <FieldLabel
          htmlFor={name}
          className="text-sm md:text-base font-semibold text-gray-700"
        >
          {label}
        </FieldLabel>
      )}
      <div className="relative flex items-center">
        <ShadcnInput
          {...props}
          {...field}
          id={name}
          type={inputType}
          value={currentValue}
          aria-invalid={isError}
          className={twMerge(
            inputVariants({ hasLeftIcon, hasRightAction, variant }),
            className,
          )}
        />
        <InputActionButton
          variant={variant}
          value={currentValue}
          onClear={() => field.onChange("")}
          isPasswordVisible={isPasswordVisible}
          onTogglePassword={() => setIsPasswordVisible((prev) => !prev)}
        />
      </div>
      {isError && (
        <FieldError errors={[fieldState.error]} className={errorClassName} />
      )}
    </Field>
  );
}
```

`errorClassName`을 넘기지 않는 기존 모든 호출부는 동작 변화 없음 (prop이 `undefined`면 `FieldError`가 기본 `text-destructive`를 그대로 씀).

- [ ] **Step 4: 컴포넌트 구현**

Create `components/mypage/MyPageInfo.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { twMerge } from "tailwind-merge";
import { FormInput } from "@/components/common/input/FormInput";
import { inputVariants } from "@/components/common/input/Input.variants";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Button } from "@/components/common/Button";
import { ProfileImageInput } from "./ProfileImageInput";
import { myPageFormSchema, type MyPageFormValues } from "./myPageForm.types";
import { showSaveFailureToast, showSaveSuccessToast } from "./toast";
import {
  useGetUserMe,
  useGetUsersCheckNickname,
  usePatchUserMe,
  usePatchUserPassword,
} from "@/hooks/queries/users/users.bff.hook";

const NICKNAME_CHECK_DEBOUNCE_MS = 400;

export function MyPageInfo() {
  const { data: userMe } = useGetUserMe();
  const user = userMe?.data;

  const { control, handleSubmit, watch, reset } =
    useForm<MyPageFormValues>({
      resolver: zodResolver(myPageFormSchema),
      defaultValues: {
        name: "",
        image: undefined,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    });

  useEffect(() => {
    if (!user) {
      return;
    }

    reset({
      name: user.name,
      image: user.image ?? undefined,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [user, reset]);

  const nameValue = watch("name");
  const [debouncedName, setDebouncedName] = useState(nameValue);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedName(nameValue),
      NICKNAME_CHECK_DEBOUNCE_MS,
    );
    return () => clearTimeout(timer);
  }, [nameValue]);

  const isNameChanged = !!user && debouncedName !== user.name;
  const { data: nicknameCheck } = useGetUsersCheckNickname({
    name: isNameChanged ? debouncedName : "",
  });
  const isNameAvailable = nicknameCheck?.data.isAvailable;

  const { mutateAsync: patchUserMe } = usePatchUserMe();
  const { mutateAsync: patchUserPassword } = usePatchUserPassword();

  const onSubmit = async (values: MyPageFormValues) => {
    if (!user) {
      showSaveFailureToast();
      return;
    }

    const shouldUpdateProfile =
      values.name !== user.name || values.image !== (user.image ?? undefined);
    const shouldUpdatePassword = values.currentPassword !== "";

    if (!shouldUpdateProfile && !shouldUpdatePassword) {
      showSaveFailureToast();
      return;
    }

    const results = await Promise.allSettled([
      shouldUpdateProfile
        ? patchUserMe({ data: { name: values.name, image: values.image } })
        : Promise.resolve(),
      shouldUpdatePassword
        ? patchUserPassword({
            data: {
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            },
          })
        : Promise.resolve(),
    ]);

    const hasFailure = results.some((result) => result.status === "rejected");

    if (hasFailure) {
      showSaveFailureToast();
      return;
    }

    showSaveSuccessToast();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[560px] flex-col items-center gap-12 rounded-[32px] bg-white px-8 py-10"
    >
      <ProfileImageInput control={control} name="image" />

      <div className="flex w-full flex-col gap-10">
        <div className="flex w-full flex-col gap-4">
          <Field className="gap-2">
            <FieldLabel className="text-sm md:text-base font-semibold text-gray-700">
              이메일
            </FieldLabel>
            <ShadcnInput
              readOnly
              value={user?.email ?? ""}
              className={twMerge(
                inputVariants({ variant: "text" }),
                "bg-[#FAFAFA]",
              )}
            />
          </Field>
          <div className="flex w-full flex-col gap-2">
            <FormInput control={control} name="name" label="이름" />
            {isNameChanged && isNameAvailable !== undefined && (
              <p
                className={
                  isNameAvailable
                    ? "px-1 text-sm font-medium text-[#009D97]"
                    : "px-1 text-sm font-medium text-red-500"
                }
              >
                {isNameAvailable
                  ? "사용 가능한 이름입니다."
                  : "이미 사용 중인 이름입니다."}
              </p>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p className="px-1 text-base font-semibold text-gray-700">
            비밀번호 변경
          </p>
          <div className="flex w-full flex-col gap-3">
            <FormInput
              control={control}
              name="currentPassword"
              variant="password"
              label="현재 비밀번호"
              placeholder="현재 비밀번호를 입력해주세요"
              errorClassName="text-red-500"
            />
            <FormInput
              control={control}
              name="newPassword"
              variant="password"
              label="새 비밀번호"
              placeholder="새 비밀번호를 입력해주세요"
              errorClassName="text-red-500"
            />
            <FormInput
              control={control}
              name="confirmPassword"
              variant="password"
              label="새 비밀번호 확인"
              placeholder="새 비밀번호를 다시 입력해주세요"
              errorClassName="text-red-500"
            />
          </div>
        </div>
      </div>

      <Button type="submit" fullWidth>
        저장하기
      </Button>
    </form>
  );
}
```

이메일은 `MyPageFormValues`에 없는 읽기 전용 표시값이라 `FormInput`(제네릭이 `FieldPath<MyPageFormValues>`로 제약됨)에 `name="email"`을 넘기면 타입 에러가 난다 — 그래서 이메일만 `Field`/`FieldLabel`/`ShadcnInput`을 직접 써서 정적으로 렌더링하고, 나머지(`name`, 비밀번호 3필드)는 그대로 `FormInput`을 쓴다.

- [ ] **Step 5: 테스트 통과 확인**

Run: `npx jest components/mypage/MyPageInfo.test.tsx`
Expected: PASS (4 tests). 실패하면 `FormInput`이 실제로 렌더링하는 `label`-`input` 연결(`htmlFor`/`id`)이 테스트의 `getByLabelText`와 맞는지 확인하고 맞춘다.

- [ ] **Step 6: 전체 테스트 스위트 통과 확인**

Run: `npm test`
Expected: PASS, 기존 `__tests__/page.test.tsx`와 `FormInput`을 쓰는 다른 기존 테스트(로그인/회원가입 등)를 포함해 전부 통과 — `errorClassName`이 optional이라 기존 호출부는 영향 없어야 함

- [ ] **Step 7: Commit**

```bash
git add components/common/input/FormInput.tsx components/mypage/MyPageInfo.tsx components/mypage/MyPageInfo.test.tsx
git commit -m "feat: 마이페이지 내 정보 관리 폼 컴포넌트 추가"
```

---

## Task 6: `/mypage` 페이지 라우트

**Files:**
- Create: `app/(with-header)/mypage/page.tsx`

**Interfaces:**
- Consumes: `MyPageInfo` (Task 5), `getUserMeQueryOptionsServer()` (기존 `hooks/queries/users/users.server.ts`)

- [ ] **Step 1: 페이지 작성**

Create `app/(with-header)/mypage/page.tsx`:

```tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { MyPageInfo } from "@/components/mypage/MyPageInfo";
import { getUserMeQueryOptionsServer } from "@/hooks/queries/users/users.server";

export default async function MyPagePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getUserMeQueryOptionsServer());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex w-full flex-col items-start gap-10 px-8 py-[72px] lg:items-center">
        <h1 className="px-1 text-2xl font-semibold text-black">
          내 정보 관리
        </h1>
        <MyPageInfo />
      </div>
    </HydrationBoundary>
  );
}
```

- [ ] **Step 2: 빌드 확인**

Run: `npm run build`
Expected: `/mypage` 라우트가 빌드 결과에 포함되고 타입 에러 없이 성공

- [ ] **Step 3: 개발 서버로 수동 확인**

Run: `npm run dev`

브라우저에서 로그인 후 `/mypage` 접속:
- 사이드메뉴, 이메일(읽기전용, 회색 배경), 이름, 비밀번호 3필드, "저장하기" 버튼이 보이는지
- 아무것도 안 바꾸고 저장 → 실패 토스트 "저장이 실패하였습니다" (4초 후 사라짐)
- 이름만 바꾸고 저장 → 성공 토스트, 새로고침해도 이름이 반영되어 있는지
- 새 비밀번호/확인 비밀번호를 다르게 입력 → "비밀번호가 일치하지 않습니다" 인라인 에러
- 브라우저 폭을 1920/744/375로 바꿔가며 카드 폭과 사이드메뉴가 반응형 스펙대로 보이는지

Expected: 위 시나리오 전부 스펙([docs/superpowers/specs/2026-07-28-mypage-info-design.md](../specs/2026-07-28-mypage-info-design.md))대로 동작

- [ ] **Step 4: Commit**

```bash
git add "app/(with-header)/mypage/page.tsx"
git commit -m "feat: /mypage 라우트 추가"
```

---

## Self-Review Notes

- **스펙 커버리지**: 라우트/파일구조, 데이터 레이어, 폼 구성, zod 검증, 제출 흐름, 토스트, 아이콘, 반응형 항목 모두 Task 1~6에 매핑됨. 스펙의 "테스트 관점" 4개 항목은 Task 3(zod 단위 테스트)과 Task 5(제출 흐름 테스트)에서 커버.
- **알려진 불확실 지점** (구현 중 확인 필요, 플레이스홀더 아님 — 실행 전 확정 불가능한 3rd-party/미확인 값이라 명시):
  - Task 1: shadcn CLI가 실제로 생성하는 `toast.add`/`<Toaster/>` 시그니처 (Step 2에서 확인 후 Step 4~5 조정)
  - Task 5 Step 0: `GetTeamIdUsersCheckNickname200`의 실제 필드명 (`isAvailable` 가정, 다르면 치환)
  - Task 5: `FormInput`이 `readOnly` 이메일 표시를 그대로 지원하는지 (안 되면 정적 마크업으로 대체)
