import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import RecentTaskRow from "@/components/dashboard/RecentTasksCard/RecentTaskRow";
import SectionTitle from "@/components/dashboard/SectionTitle/SectionTitle";
import type { DashboardTask } from "@/components/dashboard/types";
import Image from "next/image";
import Link from "next/link";

interface RecentTasksCardProps {
  todos: GetTeamIdTodos200TodosItem[];
}

const getRecentTask = (todo: GetTeamIdTodos200TodosItem): DashboardTask => ({
  id: todo.id,
  title: todo.title,
  done: todo.done,
  note: todo.noteIds.length > 0,
  link: !!todo.linkUrl,
  favorite: todo.isFavorite,
});

export default function RecentTasksCard({ todos }: RecentTasksCardProps) {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <SectionTitle
          icon={
            <Image
              className="w-[32px] h-[32px] lg:w-[40px] lg:h-[40px]"
              src="/icons/dashboard/todo.svg"
              alt="todo"
              width={40}
              height={40}
            />
          }
        >
          최근 등록한 할일
        </SectionTitle>
        <Link
          href="/todos"
          className="flex items-center pr-2 text-sm lg:text-base font-semibold text-orange-600"
        >
          모두 보기
          <Image
            src="/icons/dashboard/chevron.svg"
            alt="chevron-right"
            width={20}
            height={20}
          />
        </Link>
      </div>
      <div className="h-[186px] lg:h-64 rounded-[28px] lg:rounded-[40px] bg-orange-500 flex flex-col px-8 py-[30px] shadow-[0_10px_40px_rgba(255,158,89,0.4)]">
        {todos.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-white font-semibold">
              최근에 등록한 할 일이 없어요
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-1.5">
            {todos.slice(0, 4).map((todo) => (
              <RecentTaskRow key={todo.id} task={getRecentTask(todo)} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
