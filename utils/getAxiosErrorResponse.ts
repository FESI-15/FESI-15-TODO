import { isAxiosError } from "axios";

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
