"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormInput } from "../input/FormInput";
import { Button } from "../Button";
import { useForm } from "react-hook-form";

interface LinkFormValues {
  link: string;
}

export default function LinkModal() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LinkFormValues>({
    defaultValues: {
      link: "",
    },
  });

  const onCreate = (values: LinkFormValues) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle showCloseButton={true}>링크 업로드</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onCreate)}>
          <div className="mt-6 md:mt-8">
            <FormInput
              control={control}
              name="link"
              fieldClassName="w-full"
              placeholder="링크를 입력해주세요"
            />
          </div>
          <DialogFooter>
            <div className="flex gap-2 w-full mt-4 md:mt-6">
              <Button
                type="submit"
                fullWidth
                hierarchy="primary"
                size="lg"
                disabled={!isValid}
              >
                확인
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
