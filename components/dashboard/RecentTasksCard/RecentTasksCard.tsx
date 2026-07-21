import { ChevronRight, ClipboardList } from "lucide-react";

import type { GetTeamIdTodos200TodosItem } from "@/apis/model";
import RecentTaskRow from "@/components/dashboard/RecentTasksCard/RecentTaskRow";
import SectionTitle from "@/components/dashboard/SectionTitle/SectionTitle";
import type { DashboardTask } from "@/components/dashboard/types";

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
          {todos.slice(0, 4).map((todo) => (
            <RecentTaskRow key={todo.id} task={getRecentTask(todo)} />
          ))}
        </ul>
      </div>
    </section>
  );
}
