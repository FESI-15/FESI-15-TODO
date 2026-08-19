import { render, screen } from "@testing-library/react";
import RecentTasksCard from "./RecentTasksCard";
import { mockTodos } from "@/mocks/todos";
import { renderWithQueryClient } from "@/utils/renderWithQueryClient";

describe("RecentTasksCard", () => {
  test("todos가 비어있지 않으면 할 일 목록이 나온다.", () => {
    renderWithQueryClient(<RecentTasksCard todos={mockTodos} />);
    const todos = screen.getByRole("button", { name: "타이틀1" });
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
    const todoButtons = screen.getAllByTestId("todo-title");

    expect(todoButtons).toHaveLength(4);
  });
});
