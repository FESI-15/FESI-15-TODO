import type { GetTeamIdNotesParams } from "@/apis/model";
import { getTeamIdNotes, getTeamIdNotesNoteId } from "@/apis/notes/notes";
import { getAuthorizationHeaders } from "@/utils/getAuthorizationHeaders";
import { notesKeys } from "./notes.key";

export const getNotesQueryOptionsServer = (params?: GetTeamIdNotesParams) => ({
  queryKey: notesKeys.list(params),
  queryFn: async ({ signal }: { signal: AbortSignal }) => {
    const headers = await getAuthorizationHeaders();

    if (!headers) {
      throw new Error("Authentication is required.");
    }

    const response = await getTeamIdNotes(params, { headers }, signal);

    return { data: response.data };
  },
});

export const getNoteQueryOptionsServer = (noteId: number) => ({
  queryKey: notesKeys.detail(noteId),
  queryFn: async ({ signal }: { signal: AbortSignal }) => {
    const headers = await getAuthorizationHeaders();

    if (!headers) {
      throw new Error("Authentication is required.");
    }

    const response = await getTeamIdNotesNoteId(noteId, { headers }, signal);

    return { data: response.data };
  },
  enabled: !!noteId,
});
