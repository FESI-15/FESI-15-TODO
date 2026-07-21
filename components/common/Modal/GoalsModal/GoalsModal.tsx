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
import {
  getGetTeamIdGoalsQueryKey,
  usePostTeamIdGoals,
} from "@/apis/generated/goals/goals";
import NewGoalButton from "@/components/layout/SideMenu/SideMenuContainer/SideMenuActions/NewGoalButton/NewGoalButton";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useInvalidateQuery } from "@/hooks/useInvalidateQuery";

const GoalsSchema = z.object({
  title: z.string().trim().min(1, "목표를 입력해주세요."),
});

type GoalsSchemaType = z.infer<typeof GoalsSchema>;

export default function GoalsModal() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<GoalsSchemaType>({
    resolver: zodResolver(GoalsSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
    },
  });
  const { invalidateQuery } = useInvalidateQuery();

  const { mutate: createGoal, isPending } = usePostTeamIdGoals({
    mutation: {
      onSuccess: () => {
        invalidateQuery(getGetTeamIdGoalsQueryKey("2"));
        alert("목표 생성에 성공했습니다.");
      },
      onError: () => {
        alert("목표 생성에 실패했습니다.");
      },
    },
  });

  const onCreate = (values: GoalsSchemaType) => {
    createGoal({
      teamId: "2",
      data: {
        title: values.title,
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <NewGoalButton />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 목표 생성</DialogTitle>
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
                    className="text-gray-500"
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
                disabled={!isValid}
              >
                생성
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
