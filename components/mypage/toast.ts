import { toast } from "@/components/ui/toast";

const TOAST_TIMEOUT_MS = 4000;

export const showSaveSuccessToast = () => {
  toast.add({
    title: "저장이 완료되었습니다",
    type: "success",
    timeout: TOAST_TIMEOUT_MS,
  });
};

export const showSaveFailureToast = () => {
  toast.add({
    title: "저장이 실패하였습니다",
    type: "error",
    timeout: TOAST_TIMEOUT_MS,
  });
};
