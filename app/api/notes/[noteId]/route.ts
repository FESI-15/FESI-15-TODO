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

// 노트 상세 조회
export async function GET(_request: Request, context: RouteContext) {
  const noteId = await getNoteId(context);

  return handleRouteRequest((teamId, headers) =>
    getTeamIdNotesNoteId(teamId, noteId, { headers }),
  );
}

// 노트 수정
export async function PATCH(request: Request, context: RouteContext) {
  const noteId = await getNoteId(context);
  const data = await request.json();

  return handleRouteRequest((teamId, headers) =>
    patchTeamIdNotesNoteId(teamId, noteId, data, { headers }),
  );
}

// 노트 삭제
export async function DELETE(_request: Request, context: RouteContext) {
  const noteId = await getNoteId(context);

  return handleEmptyRouteRequest((teamId, headers) =>
    deleteTeamIdNotesNoteId(teamId, noteId, { headers }),
  );
}
