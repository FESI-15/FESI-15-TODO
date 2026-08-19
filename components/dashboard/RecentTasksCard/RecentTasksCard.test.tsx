import { fireEvent, render, screen } from "@testing-library/react";
import RecentTasksCard from "./RecentTasksCard";
import { GetTeamIdTodos200TodosItem } from "@/apis/model";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockTodos: GetTeamIdTodos200TodosItem[] = [
  {
    id: 1,
    teamId: "2",
    userId: 1,
    goalId: 1,
    title: "타이틀",
    done: false,
    fileUrl: null,
    linkUrl: null,
    dueDate: null,
    goal: {
      id: 1,
      title: "test",
    },
    tags: [
      {
        id: 1,
        name: "test",
      },
    ],
    noteIds: [],
    isFavorite: false,
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  },
  {
    id: 2,
    teamId: "2",
    userId: 1,
    goalId: 1,
    title: "타이틀",
    done: false,
    fileUrl: null,
    linkUrl: null,
    dueDate: null,
    goal: {
      id: 1,
      title: "test",
    },
    tags: [
      {
        id: 1,
        name: "test",
      },
    ],
    noteIds: [],
    isFavorite: false,
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  },
  {
    id: 3,
    teamId: "2",
    userId: 1,
    goalId: 1,
    title: "타이틀",
    done: false,
    fileUrl: null,
    linkUrl: null,
    dueDate: null,
    goal: {
      id: 1,
      title: "test",
    },
    tags: [
      {
        id: 1,
        name: "test",
      },
    ],
    noteIds: [],
    isFavorite: false,
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  },
  {
    id: 4,
    teamId: "2",
    userId: 1,
    goalId: 1,
    title: "타이틀",
    done: false,
    fileUrl: null,
    linkUrl: null,
    dueDate: null,
    goal: {
      id: 1,
      title: "test",
    },
    tags: [
      {
        id: 1,
        name: "test",
      },
    ],
    noteIds: [],
    isFavorite: false,
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  },
  {
    id: 5,
    teamId: "2",
    userId: 1,
    goalId: 1,
    title: "타이틀",
    done: false,
    fileUrl: null,
    linkUrl: null,
    dueDate: null,
    goal: {
      id: 1,
      title: "test",
    },
    tags: [
      {
        id: 1,
        name: "test",
      },
    ],
    noteIds: [],
    isFavorite: false,
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  },
];

const renderWithQueryClient = (component: React.ReactElement) => {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
    },
  });

  return render(
    <QueryClientProvider client={testQueryClient}>
      {component}
    </QueryClientProvider>,
  );
};

describe("RecentTasksCard", () => {
  test("todos가 비어있지 않으면 할 일 목록이 나온다.", () => {
    renderWithQueryClient(<RecentTasksCard todos={mockTodos} />);
    const todos = screen.getByRole("button", { name: "타이틀" });
    expect(todos).toBeInTheDocument();
  });
  test("todos가 빈 배열이면 최근에 등록한 할 일이 없어요 메시지가 보인다", () => {
    render(<RecentTasksCard todos={[]} />);
    const noTodosMessage = screen.getByText("최근에 등록한 할 일이 없어요");
    expect(noTodosMessage).toBeInTheDocument();
  });
  test("모두 보기 클릭시 /dashboard/todos 로 이동한다.", () => {
    render(<RecentTasksCard todos={[]} />);
    const allViewButton = screen.getByRole("link", {
      name: "모두 보기",
    });
    expect(allViewButton).toHaveAttribute("href", "/dashboard/todos");
  });
  test("할 일 목록이 4개 이상이어도 4개만 보인다.", () => {
    renderWithQueryClient(<RecentTasksCard todos={mockTodos} />);
    const todos = screen.getAllByText("타이틀");
    expect(todos).toHaveLength(4);
  });
});
