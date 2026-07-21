import { postTeamIdFiles } from "@/apis/uploads/uploads";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

export async function POST(request: Request) {
  const data = await request.json();

  return handleRouteRequest((teamId, headers) =>
    postTeamIdFiles(teamId, data, { headers }),
  );
}
