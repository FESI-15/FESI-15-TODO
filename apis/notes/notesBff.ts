import type {
  GetTeamIdNotes200,
  GetTeamIdNotesNoteId200,
  GetTeamIdNotesParams,
  PatchTeamIdNotesNoteId200,
  PatchTeamIdNotesNoteIdBody,
  PostTeamIdNotes201,
  PostTeamIdNotesBody,
} from "@/apis/model";

import { bffInstance } from "@/apis/bffAxiosInstance";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export interface NoteIdVariables {
  noteId: number;
}

export interface PostNotesVariables {
  data: PostTeamIdNotesBody;
}

export interface PatchNoteVariables extends NoteIdVariables {
  data: PatchTeamIdNotesNoteIdBody;
}

export const getNotes = (
  params?: GetTeamIdNotesParams,
  options?: SecondParameter<typeof bffInstance>,
  signal?: AbortSignal,
) => {
  return bffInstance<GetTeamIdNotes200>(
    { url: "/api/notes", method: "GET", params, signal },
    options,
  );
};

export const postNotes = (
  { data }: PostNotesVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PostTeamIdNotes201>(
    {
      url: "/api/notes",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};

export const getNote = (
  { noteId }: NoteIdVariables,
  options?: SecondParameter<typeof bffInstance>,
  signal?: AbortSignal,
) => {
  return bffInstance<GetTeamIdNotesNoteId200>(
    { url: `/api/notes/${noteId}`, method: "GET", signal },
    options,
  );
};

export const patchNote = (
  { noteId, data }: PatchNoteVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<PatchTeamIdNotesNoteId200>(
    {
      url: `/api/notes/${noteId}`,
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data,
    },
    options,
  );
};

export const deleteNote = (
  { noteId }: NoteIdVariables,
  options?: SecondParameter<typeof bffInstance>,
) => {
  return bffInstance<void>(
    { url: `/api/notes/${noteId}`, method: "DELETE" },
    options,
  );
};
