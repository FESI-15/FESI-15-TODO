import { postTeamIdImages } from "@/apis/uploads/uploads";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

export async function POST(request: Request) {
  const data = await request.json();

  return handleRouteRequest((teamId, headers) =>
    postTeamIdImages(teamId, data, { headers }),
  );
}
