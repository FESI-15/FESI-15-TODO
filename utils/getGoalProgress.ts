import type { GetTeamIdGoalsGoalId200TodosItem } from "@/apis/model";

const PERCENTAGE_MAX = 100;

export const getGoalProgress = (todos: GetTeamIdGoalsGoalId200TodosItem[]) => {
  if (todos.length === 0) {
    return 0;
  }

  const doneCount = todos.filter((todo) => todo.done).length;

  return Math.round((doneCount / todos.length) * PERCENTAGE_MAX);
};
