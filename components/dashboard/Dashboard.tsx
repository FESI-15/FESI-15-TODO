"use client";

import {
  ChevronRight,
  ClipboardList,
  FileText,
  Flag,
  Link,
  MoreVertical,
  Pencil,
  PieChart,
  Plus,
  Search,
  Star,
} from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/common/Button";
import CheckboxBasic from "@/components/common/CheckboxBasic";
import { cn } from "@/utils/cn";

interface DashboardCheckboxValues {
  checked: string;
}

interface Task {
  id: number;
  title: string;
  done?: boolean;
  note?: boolean;
  link?: boolean;
  favorite?: boolean;
  active?: boolean;
}

interface Goal {
  id: number;
  title: string;
  progress: number;
  todos: Task[];
  dones: Task[];
}

const RECENT_TASKS: Task[] = [
  { id: 1, title: "사용자 데이터 렌더링 구현", favorite: true },
  {
    id: 2,
    title: "실제 디자인 시스템 사례 조사 (예: Polaris, Carbon 등)",
    note: true,
    link: true,
    favorite: true,
  },
  {
    id: 3,
    title: "개발 폴더 구조 세팅 (src, public, components)",
    link: true,
    favorite: true,
  },
  { id: 4, title: "강의 내용을 Notion이나 문서에 요약 정리", note: true },
];

const GOALS: Goal[] = [
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
      { id: 7, title: "컴포넌트, 패턴, 템플릿의 차이 구분하기", done: true },
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
      { id: 12, title: "자바스크립트 기초 챕터4 듣기", note: true, link: true },
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

function DashboardCheckbox({
  checked = false,
  label,
  labelClassName,
}: {
  checked?: boolean;
  label: string;
  labelClassName?: string;
}) {
  const { control } = useForm<DashboardCheckboxValues>({
    defaultValues: {
      checked: checked ? "checked" : "",
    },
  });

  return (
    <CheckboxBasic
      control={control}
      name="checked"
      value="checked"
      label={label}
      className="min-w-0"
      checkboxClassName={cn(
        "size-[18px] rounded-[6px]",
        checked && "border-orange-500 bg-orange-500 text-white",
      )}
      labelClassName={cn("min-w-0 truncate text-base", labelClassName)}
      disabled
    />
  );
}

function SectionTitle({
  icon,
  iconClassName,
  children,
}: {
  icon: React.ReactNode;
  iconClassName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-2">
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl",
          iconClassName,
        )}
      >
        {icon}
      </div>
      <h2 className="text-lg font-medium text-gray-900">{children}</h2>
    </div>
  );
}

function TaskIcons({ task, dense = false }: { task: Task; dense?: boolean }) {
  const iconClassName = dense ? "size-4" : "size-3.5";

  return (
    <div className="flex h-6 shrink-0 items-center justify-end gap-2">
      {task.note && (
        <span className="flex size-6 items-center justify-center rounded-full bg-orange-200 text-orange-600">
          <FileText className={iconClassName} />
        </span>
      )}
      {task.link && (
        <span className="flex size-6 items-center justify-center rounded-full bg-orange-200 text-orange-600">
          <Link className={iconClassName} />
        </span>
      )}
      {task.active && (
        <>
          <span className="flex size-6 items-center justify-center rounded-full bg-white text-orange-600">
            <Pencil className={iconClassName} />
          </span>
          <span className="flex size-6 items-center justify-center rounded-full bg-white text-orange-600">
            <MoreVertical className={iconClassName} />
          </span>
        </>
      )}
      <Star
        className={cn(
          "size-5 shrink-0",
          task.favorite ? "fill-orange-500 text-orange-500" : "text-orange-300",
        )}
      />
    </div>
  );
}

function RecentTaskRow({ task }: { task: Task }) {
  return (
    <li className="flex h-11 items-center justify-between gap-4 px-2 py-2.5">
      <DashboardCheckbox
        label={task.title}
        labelClassName="max-w-[390px] text-sm font-semibold text-white"
      />
      <TaskIcons task={task} />
    </li>
  );
}

function ProgressCard() {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-2.5">
      <SectionTitle
        icon={<PieChart className="size-6 fill-blue-200 text-blue-300" />}
        iconClassName="bg-blue-100"
      >
        내 진행 상황
      </SectionTitle>
      <div className="relative flex h-64 overflow-hidden rounded-[40px] bg-blue-200 px-9 py-10 shadow-[0_10px_40px_rgba(0,212,190,0.24)]">
        <div className="flex items-center gap-8">
          <div className="relative size-40 rounded-full bg-white/90">
            <div className="absolute inset-5 rounded-full bg-blue-200" />
            <div className="absolute -right-1 top-16 size-7 rounded-full bg-white" />
          </div>
          <div className="z-10 text-white">
            <p className="text-xl font-semibold">체다치즈님의 진행도는</p>
            <div className="mt-3 flex items-end gap-1">
              <strong className="text-[80px] leading-[74px]">74</strong>
              <span className="text-3xl font-medium leading-9">%</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[-28px] right-9 size-36 rounded-full bg-blue-100/30" />
        <div className="absolute bottom-2 right-20 h-9 w-28 rotate-[18deg] rounded-full bg-blue-300/50" />
      </div>
    </section>
  );
}

function RecentTasksCard() {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <SectionTitle
          icon={<ClipboardList className="size-6 text-orange-600" />}
          iconClassName="bg-orange-300"
        >
          최근 등록한 할일
        </SectionTitle>
        <button
          type="button"
          className="flex items-center pr-2 text-base font-semibold text-orange-600"
        >
          모두 보기
          <ChevronRight className="size-5" />
        </button>
      </div>
      <div className="h-64 rounded-[40px] bg-orange-500 px-8 py-[30px] shadow-[0_10px_40px_rgba(255,158,89,0.4)]">
        <ul className="flex flex-col gap-1.5">
          {RECENT_TASKS.map((task) => (
            <RecentTaskRow key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function GoalHeader({ goal }: { goal: Goal }) {
  return (
    <div className="flex flex-col gap-4 px-2 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <h3 className="min-w-0 flex-1 truncate text-base font-semibold text-gray-700">
          {goal.title}
        </h3>
        <div className="flex shrink-0 items-center gap-2">
          <div className="h-2 w-60 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-orange-500"
              style={{ width: `${goal.progress}%` }}
            />
          </div>
          <span className="w-10 text-base font-bold text-orange-600">
            {goal.progress}%
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3.5">
        <label className="flex h-10 w-[239px] items-center gap-3 rounded-full border border-gray-300 bg-white px-4">
          <span className="sr-only">할 일 검색</span>
          <input
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-gray-700 outline-none placeholder:text-gray-500"
            placeholder="할 일을 검색해주세요"
          />
          <Search className="size-5 text-gray-400" />
        </label>
        <Button
          hierarchy="secondary"
          size="sm"
          className="h-10 w-[110px] gap-1 px-[18px] py-2.5 text-sm"
          leftIcon={<Plus className="size-5" />}
        >
          할 일 추가
        </Button>
      </div>
    </div>
  );
}

function GoalTaskRow({ task, done = false }: { task: Task; done?: boolean }) {
  return (
    <li
      className={cn(
        "flex h-11 items-center justify-between gap-4 rounded-xl px-2 py-2.5",
        task.active && "bg-orange-300/45",
      )}
    >
      <DashboardCheckbox
        checked={done}
        label={task.title}
        labelClassName={cn(
          "max-w-[360px] font-medium",
          done
            ? "text-gray-500"
            : task.active
              ? "font-semibold text-orange-600"
              : "text-gray-800",
        )}
      />
      <TaskIcons task={task} dense />
    </li>
  );
}

function TaskColumn({
  title,
  tasks,
  done = false,
}: {
  title: string;
  tasks: Task[];
  done?: boolean;
}) {
  return (
    <div
      className={cn(
        "h-[324px] min-w-0 flex-1 overflow-hidden rounded-3xl p-6",
        done ? "bg-white" : "bg-orange-100",
      )}
    >
      <h4
        className={cn(
          "mb-4 px-2 text-base font-bold",
          done ? "text-gray-400" : "text-orange-600",
        )}
      >
        {title}
      </h4>
      <ul className="flex flex-col gap-1">
        {tasks.map((task) => (
          <GoalTaskRow key={task.id} task={task} done={done} />
        ))}
      </ul>
    </div>
  );
}

function GoalCard({ goal }: { goal: Goal }) {
  return (
    <article className="rounded-[40px] bg-white px-8 py-6">
      <GoalHeader goal={goal} />
      <div className="mt-4 flex flex-col gap-8 xl:flex-row">
        <TaskColumn title="TO DO" tasks={goal.todos} />
        <TaskColumn title="DONE" tasks={goal.dones} done />
      </div>
    </article>
  );
}

export default function Dashboard() {
  return (
    <main className="min-w-0 flex-1 px-5 py-10 md:px-8 lg:px-12 xl:px-[88px]">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-8">
        <h1 className="px-2 text-2xl font-semibold text-gray-900">
          체다치즈님의 대시보드
        </h1>
        <div className="grid gap-8 lg:grid-cols-2">
          <RecentTasksCard />
          <ProgressCard />
        </div>
        <section className="flex flex-col gap-2.5">
          <SectionTitle
            icon={<Flag className="size-6 fill-orange-500 text-orange-500" />}
            iconClassName="bg-[#ffe5b7]"
          >
            목표 별 할일
          </SectionTitle>
          <div className="flex flex-col gap-8">
            {GOALS.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
