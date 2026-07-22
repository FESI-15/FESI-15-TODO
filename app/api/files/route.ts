import { postTeamIdFiles } from "@/apis/uploads/uploads";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

// ?�일 ?�로??URL 발급
export async function POST(request: Request) {
  const data = await request.json();

  return handleRouteRequest((headers) => postTeamIdFiles(data, { headers }));
}
