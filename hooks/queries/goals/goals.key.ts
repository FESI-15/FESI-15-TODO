export const goalsKeys = {
  all: ["goals"] as const,
  list: () => [...goalsKeys.all, "list"] as const,
  detail: (id: number) => [...goalsKeys.all, id] as const,
};
