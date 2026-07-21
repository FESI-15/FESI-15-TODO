import { postTeamIdFiles } from "@/apis/uploads/uploads";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

// 파일 업로드 URL 발급
export async function POST(request: Request) {
  const data = await request.json();

  return handleRouteRequest((teamId, headers) =>
    postTeamIdFiles(teamId, data, { headers }),
  );
}
