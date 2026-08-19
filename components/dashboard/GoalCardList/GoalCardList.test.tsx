import { renderWithQueryClient } from "@/utils/renderWithQueryClient";
import GoalCardList from "./GoalCardList";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { mockTodos } from "@/mocks/todos";
import { mockGoals } from "@/mocks/goals";

describe("GoalCardList", () => {
  test("goals가 빈 배열이면 최근에 등록한 목표가 없어요 메시지가 보인다.", () => {
    render(<GoalCardList goals={[]} todos={[]} />);
    const noGoalsMessage = screen.getByText("최근에 등록한 목표가 없어요");
    expect(noGoalsMessage).toBeInTheDocument();
  });
  test("goals가 비어있지 않으면 목표 카드가 보인다.", () => {
    renderWithQueryClient(<GoalCardList goals={mockGoals} todos={[]} />);
    const goalCard = screen.getByRole("heading", { level: 3, name: "test" });
    expect(goalCard).toBeInTheDocument();
  });
  test("todos가 빈 배열이면 할일이 없습니다. 메시지가 보인다.", () => {
    renderWithQueryClient(<GoalCardList goals={mockGoals} todos={[]} />);
    const noTodosMessage = screen.getAllByText("할일이 없습니다.");
    expect(noTodosMessage).toHaveLength(2);
  });
  test("todos가 비어있지 않으면 할일 카드가 보인다.", () => {
    renderWithQueryClient(<GoalCardList goals={mockGoals} todos={mockTodos} />);
    const goalTodos = screen.getByText("타이틀1");
    expect(goalTodos).toBeInTheDocument();
  });
  test("filter된 todos가 보인다.", () => {
    const goalsMock = [
      {
        id: 1,
        teamId: "1",
        userId: 1,
        title: "test",
        createdAt: "2026-01-01",
        updatedAt: "2026-01-01",
        todoCount: 1,
        completedCount: 1,
      },
    ];
    const todosMock = [
      {
        id: 1,
        teamId: "2",
        userId: 1,
        goalId: 2,
        title: "타이틀1",
        done: false,
        fileUrl: null,
        linkUrl: null,
        dueDate: null,
        goal: {
          id: 2,
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
    renderWithQueryClient(<GoalCardList goals={goalsMock} todos={todosMock} />);
    const goalTodos = screen.queryByText("타이틀1");
    expect(goalTodos).not.toBeInTheDocument();
  });
});
