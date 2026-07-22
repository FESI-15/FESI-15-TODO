import { useMutation, useQuery } from "@tanstack/react-query";

import type { GetTeamIdNotesParams } from "@/apis/model";
import type {
  NoteIdVariables,
  PatchNoteVariables,
  PostNotesVariables,
} from "@/apis/notes/notesBff";
import {
  deleteNote,
  getNote,
  getNotes,
  patchNote,
  postNotes,
} from "@/apis/notes/notesBff";
import { notesKeys } from "./notes.key";

export const useGetNotes = (params?: GetTeamIdNotesParams) => {
  return useQuery({
    queryKey: notesKeys.list(params),
    queryFn: ({ signal }) => getNotes(params, undefined, signal),
  });
};

export const useGetNote = ({ noteId }: NoteIdVariables) => {
  return useQuery({
    queryKey: notesKeys.detail(noteId),
    queryFn: ({ signal }) => getNote({ noteId }, undefined, signal),
    enabled: !!noteId,
  });
};

export const usePostNotes = () => {
  return useMutation({
    mutationKey: ["postNotes"],
    mutationFn: (variables: PostNotesVariables) => postNotes(variables),
  });
};

export const usePatchNote = () => {
  return useMutation({
    mutationKey: ["patchNote"],
    mutationFn: (variables: PatchNoteVariables) => patchNote(variables),
  });
};

export const useDeleteNote = () => {
  return useMutation({
    mutationKey: ["deleteNote"],
    mutationFn: (variables: NoteIdVariables) => deleteNote(variables),
  });
};
