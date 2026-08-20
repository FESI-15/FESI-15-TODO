import { screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { postAuthSignup } from "@/apis/auth/authBff";
import { renderWithQueryClient } from "@/utils/renderWithQueryClient";
import { SignupForm } from "./SignupForm";

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("@/apis/auth/authBff", () => ({ postAuthSignup: jest.fn() }));
jest.mock("@/hooks/useGoogleLogin", () => ({
  useGoogleLogin: () => ({ loginWithGoogle: jest.fn(), isPending: false }),
}));

describe("SignupForm", () => {
  const push = jest.fn();

  beforeEach(() => {
    push.mockClear();
    jest.mocked(postAuthSignup).mockClear();
    jest.mocked(useRouter).mockReturnValue({
      push,
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  describe("유효성 검사", () => {
    test("필드를 비운 채 제출하면 API가 호출되지 않아야 함", async () => {
      renderWithQueryClient(<SignupForm />);
      const submitButton = screen.getByRole("button", {
        name: "회원가입 하기",
      });

      fireEvent.click(submitButton);

      const errorMessage = await screen.findByText("이름을 입력해주세요");
      expect(errorMessage).toBeInTheDocument();
      expect(postAuthSignup).not.toHaveBeenCalled();
    });
  });

  describe("제출 성공", () => {
    test("API가 올바른 데이터로 호출되고 대시보드로 이동해야 함", async () => {
      jest
        .mocked(postAuthSignup)
        .mockResolvedValue({} as Awaited<ReturnType<typeof postAuthSignup>>);
      renderWithQueryClient(<SignupForm />);
      const nameInput = screen.getByLabelText("이름");
      const emailInput = screen.getByLabelText("이메일");
      const passwordInput = screen.getByLabelText("비밀번호");
      const passwordConfirmInput = screen.getByLabelText("비밀번호 확인");
      const submitButton = screen.getByRole("button", {
        name: "회원가입 하기",
      });

      fireEvent.change(nameInput, { target: { value: "김민식" } });
      fireEvent.change(emailInput, { target: { value: "test@naver.com" } });
      fireEvent.change(passwordInput, { target: { value: "test1234" } });
      fireEvent.change(passwordConfirmInput, {
        target: { value: "test1234" },
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(postAuthSignup).toHaveBeenCalledWith(
          {
            data: {
              name: "김민식",
              email: "test@naver.com",
              password: "test1234",
            },
          },
          undefined,
        );
        expect(push).toHaveBeenCalledWith("/dashboard");
      });
    });
  });

  describe("제출 실패", () => {
    test("API 호출이 실패하면 이메일 필드에 에러 메시지가 노출되어야 함", async () => {
      jest.mocked(postAuthSignup).mockRejectedValue(new Error("가입 실패"));
      renderWithQueryClient(<SignupForm />);
      const nameInput = screen.getByLabelText("이름");
      const emailInput = screen.getByLabelText("이메일");
      const passwordInput = screen.getByLabelText("비밀번호");
      const passwordConfirmInput = screen.getByLabelText("비밀번호 확인");
      const submitButton = screen.getByRole("button", {
        name: "회원가입 하기",
      });

      fireEvent.change(nameInput, { target: { value: "김민식" } });
      fireEvent.change(emailInput, { target: { value: "test@naver.com" } });
      fireEvent.change(passwordInput, { target: { value: "test1234" } });
      fireEvent.change(passwordConfirmInput, {
        target: { value: "test1234" },
      });
      fireEvent.click(submitButton);

      const errorMessage = await screen.findByText(
        "이미 가입된 이메일이거나 요청이 올바르지 않습니다",
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
