import {
  deleteTeamIdNotesNoteId,
  getTeamIdNotesNoteId,
  patchTeamIdNotesNoteId,
} from "@/apis/notes/notes";
import {
  handleEmptyRouteRequest,
  handleRouteRequest,
} from "@/utils/handleRouteRequest";

interface RouteContext {
  params: Promise<{
    noteId: string;
  }>;
}

const getNoteId = async (context: RouteContext) => {
  const { noteId } = await context.params;

  return Number(noteId);
};

// ?�트 ?�세 조회
export async function GET(_request: Request, context: RouteContext) {
  const noteId = await getNoteId(context);

  return handleRouteRequest((headers) =>
    getTeamIdNotesNoteId(noteId, { headers }),
  );
}

// ?�트 ?�정
export async function PATCH(request: Request, context: RouteContext) {
  const noteId = await getNoteId(context);
  const data = await request.json();

  return handleRouteRequest((headers) =>
    patchTeamIdNotesNoteId(noteId, data, { headers }),
  );
}

// ?�트 ??��
export async function DELETE(_request: Request, context: RouteContext) {
  const noteId = await getNoteId(context);

  return handleEmptyRouteRequest((headers) =>
    deleteTeamIdNotesNoteId(noteId, { headers }),
  );
}
