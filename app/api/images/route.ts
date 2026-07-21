import { postTeamIdImages } from "@/apis/uploads/uploads";
import { handleRouteRequest } from "@/utils/handleRouteRequest";

// 이미지 업로드 URL 발급
export async function POST(request: Request) {
  const data = await request.json();

  return handleRouteRequest((teamId, headers) =>
    postTeamIdImages(teamId, data, { headers }),
  );
}
