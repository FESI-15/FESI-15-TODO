"use client";

import { usePostAuthLogin } from "@/hooks/queries/auth.bff.hook";
import { useGetGoals } from "@/hooks/queries/goals/goals.bff.hook";

export default function Dashboard() {
  const { data: goals } = useGetGoals();
  const { mutate: postAuthLogin } = usePostAuthLogin();
  return (
    <div>
      {goals?.data.goals.map((goal) => goal.title)}
      <button
        onClick={() =>
          postAuthLogin({
            data: { email: "ilhai3@naver.com", password: "sks98sk11" },
          })
        }
      >
        Login
      </button>
    </div>
  );
}
