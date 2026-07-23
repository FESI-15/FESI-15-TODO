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
import NewGoalButton from "@/components/layout/SideMenu/SideMenuContainer/SideMenuActions/NewGoalButton/NewGoalButton";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInvalidateQuery } from "@/hooks/useInvalidateQuery";
import { PostTeamIdGoals400, PostTeamIdGoals401 } from "@/apis/model";
import { usePostGoals } from "@/hooks/queries/goals/goals.bff.hook";
import { goalsKeys } from "@/hooks/queries/goals/goals.key";

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

  const { mutate: createGoal, isPending } = usePostGoals({
    mutation: {
      onSuccess: () => {
        invalidateQuery(goalsKeys.list());
        alert("목표 생성에 성공했습니다.");
      },
      onError: (error: PostTeamIdGoals400 | PostTeamIdGoals401) => {
        alert(error.message);
      },
    },
  });

  const onCreate = (values: GoalsSchemaType) => {
    createGoal({
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
                disabled={!isValid || isPending}
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
