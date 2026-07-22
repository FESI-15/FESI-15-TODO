import type { GetTeamIdNotesParams } from "@/apis/model";

export const notesKeys = {
  list: (params?: GetTeamIdNotesParams) => ["/api/notes", params] as const,
  detail: (id: number) => [`/api/notes/${id}`] as const,
};
