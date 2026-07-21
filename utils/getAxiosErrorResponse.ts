import { isAxiosError } from "axios";

// 백엔드 axios 에러를 NextResponse로 넘기기 쉬운 형태로 정규화합니다.
export const getAxiosErrorResponse = (error: unknown) => {
  if (isAxiosError(error)) {
    return {
      data: error.response?.data ?? { message: error.message },
      status: error.response?.status ?? 500,
    };
  }

  return {
    data: { message: "Unexpected error." },
    status: 500,
  };
};
