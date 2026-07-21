"use client";
import { usePostAuthLogin } from "@/hooks/queries/auth.bff.hook";

export default function Home() {
  const { mutate } = usePostAuthLogin();
  return (
    <div>
      <form
        action={() =>
          mutate({
            data: { email: "ilhai3@naver.com", password: "sks98sk11" },
          })
        }
      >
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
