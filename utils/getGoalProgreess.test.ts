import { GetTeamIdGoalsGoalId200TodosItem } from "@/apis/model";
import { getGoalProgress } from "./getGoalProgress";

describe("getGoalProgress 파일 테스트", () => {
  test("100% 진행 상태일 때", () => {
    const todos = [
      {
        id: 3,
        title: "test",
        description: "test",
        done: true,
        createdAt: "2026-01-01",
        updatedAt: "2026-01-01",
      },
    ];
    expect(getGoalProgress(todos)).toBe(100);
  });
  test("50% 진행 상태일 때", () => {
    const todos = [
      {
        id: 3,
        title: "test",
        description: "test",
        done: true,
        createdAt: "2026-01-01",
        updatedAt: "2026-01-01",
      },
      {
        id: 3,
        title: "test",
        description: "test",
        done: false,
        createdAt: "2026-01-01",
        updatedAt: "2026-01-01",
      },
    ];
    expect(getGoalProgress(todos)).toBe(50);
  });
  test("0% 진행 상태일 때", () => {
    const todos = [
      {
        id: 3,
        title: "test",
        description: "test",
        done: false,
        createdAt: "2026-01-01",
        updatedAt: "2026-01-01",
      },
      {
        id: 3,
        title: "test",
        description: "test",
        done: false,
        createdAt: "2026-01-01",
        updatedAt: "2026-01-01",
      },
    ];
    expect(getGoalProgress(todos)).toBe(0);
  });
  test("계산 결과 반올림", () => {
    const todos = [
      {
        id: 3,
        title: "test",
        description: "test",
        done: true,
        createdAt: "2026-01-01",
        updatedAt: "2026-01-01",
      },
      {
        id: 3,
        title: "test",
        description: "test",
        done: false,
        createdAt: "2026-01-01",
        updatedAt: "2026-01-01",
      },
      {
        id: 3,
        title: "test",
        description: "test",
        done: false,
        createdAt: "2026-01-01",
        updatedAt: "2026-01-01",
      },
    ];
    expect(getGoalProgress(todos)).toBe(33);
  });
  test("빈 배열일 때", () => {
    const todos: GetTeamIdGoalsGoalId200TodosItem[] = [];
    expect(getGoalProgress(todos)).toBe(0);
  });
});
