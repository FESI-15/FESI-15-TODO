import { postTeamIdFiles } from "@/apis/uploads/uploads";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

// 파일 업로드
export async function POST(request: Request) {
  const data = await request.json();

  return handleRouteRequest((headers) => postTeamIdFiles(data, { headers }));
}
