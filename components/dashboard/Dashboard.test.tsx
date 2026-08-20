import { screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { renderWithQueryClient } from "@/utils/renderWithQueryClient";
import useHeaderStore from "@/store/useHeaderStore";

jest.mock("@/hooks/queries/users/users.bff.hook", () => ({
  useGetUserMe: jest.fn().mockReturnValue({
    data: {
      data: {
        name: "test",
      },
    },
  }),
}));

jest.mock("@/hooks/queries/todos/todos.bff.hook", () => ({
  useGetTodos: jest.fn().mockReturnValue({
    data: {
      data: {
        todos: [
          {
            id: 1,
            teamId: "2",
            userId: 1,
            goalId: 1,
            title: "타이틀1",
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
        ],
      },
    },
  }),
  usePatchTodo: jest.fn().mockReturnValue({
    mutate: jest.fn(),
  }),
  useDeleteTodo: jest.fn().mockReturnValue({
    mutate: jest.fn(),
  }),
}));

jest.mock("@/hooks/queries/goals/goals.bff.hook", () => ({
  useGetGoals: jest.fn().mockReturnValue({
    data: {
      data: {
        goals: [
          {
            id: 1,
            teamId: "1",
            userId: 1,
            title: "목표 타이틀",
            createdAt: "2026-01-01",
            updatedAt: "2026-01-01",
            todoCount: 1,
            completedCount: 1,
          },
        ],
      },
    },
  }),
}));

describe("Dashboard 컴포넌트 테스트", () => {
  beforeEach(() => {
    useHeaderStore.setState({ title: "" });
  });
  test("제목 표시되는지 확인", () => {
    renderWithQueryClient(<Dashboard />);
    const heading = screen.getByText("test님의 대시보드");
    expect(heading).toBeInTheDocument();
  });
  test("최근 등록한 할 일 표시되는지 확인", () => {
    renderWithQueryClient(<Dashboard />);
    const todos = screen.getAllByText("타이틀1");
    expect(todos).toHaveLength(2);
  });
  test("목표별 할일에 목표가 표시되는지 확인", () => {
    renderWithQueryClient(<Dashboard />);
    const goals = screen.getByText("목표 타이틀");
    expect(goals).toBeInTheDocument();
  });
});
