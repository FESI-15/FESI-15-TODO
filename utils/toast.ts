import { toast } from "@/components/ui/toast";

const TOAST_TIMEOUT_MS = 4000;

export const showSaveSuccessToast = (message: string) => {
  toast.add({
    title: message,
    type: "success",
    timeout: TOAST_TIMEOUT_MS,
  });
};

export const showSaveFailureToast = (message: string) => {
  toast.add({
    title: message,
    type: "error",
    timeout: TOAST_TIMEOUT_MS,
  });
};
