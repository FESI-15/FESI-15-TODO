import { signupSchema } from "./authForm.types";
import { loginSchema } from "./authForm.types";

describe("signupSchema", () => {
  const validData = {
    name: "테스트",
    email: "test@naver.com",
    password: "test1234",
    passwordConfirm: "test1234",
  };

  describe("이름 검사", () => {
    test("이름이 유효한 길이면 유효함을 반환해야 함", () => {
      const result = signupSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test("이름을 입력하지 않으면 유효하지 않음을 반환해야 함", () => {
      const data = { ...validData, name: "" };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("이름을 입력해주세요");
      }
    });

    test("이름이 21자면 유효하지 않음을 반환해야 함", () => {
      const data = {
        ...validData,
        name: "가가가가가가가가가가가가가가가가가가가가가",
      };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "이름은 20자 이하로 입력해주세요",
        );
      }
    });
  });

  describe("이메일 검사", () => {
    test("이메일이 유효한 형식이면 유효함을 반환해야 함", () => {
      const result = signupSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test("이메일을 입력하지 않으면 유효하지 않음을 반환해야 함", () => {
      const data = { ...validData, email: "" };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("이메일을 입력해주세요");
      }
    });

    test("이메일 형식이 아니면 유효하지 않음을 반환해야 함", () => {
      const data = { ...validData, email: "test" };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "올바른 이메일 형식이 아닙니다",
        );
      }
    });
  });

  describe("비밀번호 검사", () => {
    test("비밀번호와 비밀번호 확인이 유효하면 유효함을 반환해야 함", () => {
      const result = signupSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test("비밀번호가 8자 미만이면 유효하지 않음을 반환해야 함", () => {
      const data = {
        ...validData,
        password: "test123",
        passwordConfirm: "test123",
      };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "비밀번호는 8자 이상 입력해주세요",
        );
      }
    });

    test("비밀번호 확인을 입력하지 않으면 유효하지 않음을 반환해야 함", () => {
      const data = { ...validData, passwordConfirm: "" };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "비밀번호를 한 번 더 입력해주세요",
        );
      }
    });

    test("비밀번호와 비밀번호 확인이 다르면 유효하지 않음을 반환해야 함", () => {
      const data = { ...validData, passwordConfirm: "aaaa12334" };
      const result = signupSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "비밀번호가 일치하지 않습니다",
        );
      }
    });
  });
});

describe("loginSchema", () => {
  const validData = { email: "test@naver.com", password: "test1234" };

  describe("이메일 검사", () => {
    test("이메일과 비밀번호가 유효하면 유효함을 반환해야 함", () => {
      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test("이메일을 입력하지 않으면 유효하지 않음을 반환해야 함", () => {
      const data = { ...validData, email: "" };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("이메일을 입력해주세요");
      }
    });

    test("이메일 형식이 아니면 유효하지 않음을 반환해야 함", () => {
      const data = { ...validData, email: "test" };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "올바른 이메일 형식이 아닙니다",
        );
      }
    });
  });

  describe("비밀번호 검사", () => {
    test("비밀번호가 유효하면 유효함을 반환해야 함", () => {
      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test("비밀번호를 입력하지 않으면 유효하지 않음을 반환해야 함", () => {
      const data = { ...validData, password: "" };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("비밀번호를 입력해주세요");
      }
    });
  });
});
