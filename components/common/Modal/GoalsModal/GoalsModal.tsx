"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormInput } from "@/components/common/input/FormInput";
import { Button } from "@/components/common/Button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  usePatchGoal,
  usePostGoals,
} from "@/hooks/queries/goals/goals.bff.hook";

const GoalsSchema = z.object({
  title: z.string().trim().min(1, "목표를 입력해주세요."),
});

type GoalsSchemaType = z.infer<typeof GoalsSchema>;

interface GoalsModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultValues?: GoalsSchemaType & { id: number };
  children?: React.ReactNode;
}

export default function GoalsModal({
  children,
  open,
  onOpenChange,
  defaultValues,
}: GoalsModalProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<GoalsSchemaType>({
    resolver: zodResolver(GoalsSchema),
    mode: "onChange",
    defaultValues: {
      title: defaultValues?.title ?? "",
    },
  });
  const { mutate: createGoal, isPending } = usePostGoals();
  const { mutate: updateGoal, isPending: isUpdating } = usePatchGoal(
    defaultValues?.id ?? 0,
  );

  const handleSuccess = () => {
    onOpenChange?.(false);
  };

  const handleError = (error: Error) => {
    alert(error.message);
  };

  const onCreate = (values: GoalsSchemaType) => {
    if (defaultValues) {
      updateGoal(
        {
          goalId: defaultValues.id,
          data: {
            title: values.title,
          },
        },
        {
          onSuccess: handleSuccess,
          onError: handleError,
        },
      );
    } else {
      createGoal(
        {
          data: {
            title: values.title,
          },
        },
        {
          onSuccess: handleSuccess,
          onError: handleError,
        },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "목표 수정" : "새 목표 생성"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onCreate)}>
          <div className="mt-6 md:mt-8">
            <FormInput
              control={control}
              name="title"
              fieldClassName="w-full"
              placeholder="목표를 입력해주세요"
            />
          </div>
          <div className="mt-6 md:mt-8">
            <DialogFooter>
              <DialogClose
                render={
                  <Button
                    className="text-gray-500 dark:text-muted-foreground"
                    fullWidth
                    hierarchy="tertiary"
                    size="lg"
                  >
                    취소
                  </Button>
                }
              />
              <Button
                type="submit"
                fullWidth
                hierarchy="primary"
                size="lg"
                disabled={!isValid || isPending || isUpdating}
              >
                {defaultValues ? "수정" : "생성"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
