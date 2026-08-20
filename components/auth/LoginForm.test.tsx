import { screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { postAuthLogin } from "@/apis/auth/authBff";
import { renderWithQueryClient } from "@/utils/renderWithQueryClient";
import { LoginForm } from "./LoginForm";

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("@/apis/auth/authBff", () => ({ postAuthLogin: jest.fn() }));
jest.mock("@/hooks/useGoogleLogin", () => ({
  useGoogleLogin: () => ({ loginWithGoogle: jest.fn(), isPending: false }),
}));

describe("LoginForm", () => {
  const replace = jest.fn();

  beforeEach(() => {
    replace.mockClear();
    jest.mocked(postAuthLogin).mockClear();
    jest.mocked(useRouter).mockReturnValue({
      push: jest.fn(),
      replace,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  describe("유효성 검사", () => {
    test("필드를 비운 채 제출하면 에러 메시지가 노출되고 API가 호출되지 않아야 함", async () => {
      renderWithQueryClient(<LoginForm />);
      const submitButton = screen.getByRole("button", { name: "로그인하기" });

      fireEvent.click(submitButton);

      const errorMessage = await screen.findByText("이메일을 입력해주세요");
      expect(errorMessage).toBeInTheDocument();
      expect(postAuthLogin).not.toHaveBeenCalled();
    });
  });

  describe("제출 성공", () => {
    test("API가 올바른 데이터로 호출되고 대시보드로 이동해야 함", async () => {
      jest
        .mocked(postAuthLogin)
        .mockResolvedValue({} as Awaited<ReturnType<typeof postAuthLogin>>);
      renderWithQueryClient(<LoginForm />);
      const emailInput = screen.getByPlaceholderText("이메일을 입력해주세요");
      const passwordInput =
        screen.getByPlaceholderText("비밀번호를 입력해주세요");
      const submitButton = screen.getByRole("button", { name: "로그인하기" });

      fireEvent.change(emailInput, { target: { value: "test@naver.com" } });
      fireEvent.change(passwordInput, { target: { value: "test1234" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(postAuthLogin).toHaveBeenCalledWith(
          { data: { email: "test@naver.com", password: "test1234" } },
          undefined,
        );
        expect(replace).toHaveBeenCalledWith("/dashboard");
      });
    });
  });

  describe("제출 실패", () => {
    test("API 호출이 실패하면 비밀번호 필드에 에러 메시지가 노출되어야 함", async () => {
      jest.mocked(postAuthLogin).mockRejectedValue(new Error("로그인 실패"));
      renderWithQueryClient(<LoginForm />);
      const emailInput = screen.getByPlaceholderText("이메일을 입력해주세요");
      const passwordInput =
        screen.getByPlaceholderText("비밀번호를 입력해주세요");
      const submitButton = screen.getByRole("button", { name: "로그인하기" });

      fireEvent.change(emailInput, { target: { value: "test@naver.com" } });
      fireEvent.change(passwordInput, { target: { value: "test1234" } });
      fireEvent.click(submitButton);

      const errorMessage = await screen.findByText(
        "이메일 또는 비밀번호가 올바르지 않습니다",
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
