import { getTeamIdTodos, postTeamIdTodos } from "@/apis/todos/todos";
import type { GetTeamIdTodosParams } from "@/apis/model";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

// ????목록 조회
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params: GetTeamIdTodosParams = {
    cursor: searchParams.has("cursor")
      ? Number(searchParams.get("cursor"))
      : undefined,
    limit: searchParams.has("limit")
      ? Number(searchParams.get("limit"))
      : undefined,
    goalId: searchParams.has("goalId")
      ? Number(searchParams.get("goalId"))
      : undefined,
    done: searchParams.has("done")
      ? (searchParams.get("done") as GetTeamIdTodosParams["done"])
      : undefined,
    sort: searchParams.has("sort")
      ? (searchParams.get("sort") as GetTeamIdTodosParams["sort"])
      : undefined,
  };

  return handleRouteRequest((headers) => getTeamIdTodos(params, { headers }));
}

// ?????�성
export async function POST(request: Request) {
  const data = await request.json();

  return handleRouteRequest((headers) => postTeamIdTodos(data, { headers }));
}
