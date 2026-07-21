import { getTeamIdNotes, postTeamIdNotes } from "@/apis/notes/notes";
import type { GetTeamIdNotesParams } from "@/apis/model";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params: GetTeamIdNotesParams = {
    cursor: searchParams.has("cursor")
      ? Number(searchParams.get("cursor"))
      : undefined,
    limit: searchParams.has("limit")
      ? Number(searchParams.get("limit"))
      : undefined,
    todoId: searchParams.has("todoId")
      ? Number(searchParams.get("todoId"))
      : undefined,
    goalId: searchParams.has("goalId")
      ? Number(searchParams.get("goalId"))
      : undefined,
    sort: searchParams.has("sort")
      ? (searchParams.get("sort") as GetTeamIdNotesParams["sort"])
      : undefined,
  };

  return handleRouteRequest((teamId, headers) =>
    getTeamIdNotes(teamId, params, { headers }),
  );
}

export async function POST(request: Request) {
  const data = await request.json();

  return handleRouteRequest((teamId, headers) =>
    postTeamIdNotes(teamId, data, { headers }),
  );
}
