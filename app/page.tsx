import { TextInput, PasswordInput } from "@/components/common/input";

export default function Home() {
  return (
    <div>
      {/* 라벨 없이, 외부 커스텀 */}
      <TextInput
        type="email"
        placeholder="검색어를 입력하세요"
        fieldClassName="w-[600px]"
      />
      {/* 라벨 있이 (회원가입 폼처럼) — id 꼭 같이 지정 */}
      <TextInput
        id="signup-name"
        label="이름"
        placeholder="이름을 입력해주세요"
      />
      <TextInput
        inputSize="mobile"
        isError
        errorMessage="잘못된 이메일입니다."
        placeholder="이메일을 입력해주세요"
        defaultValue="abc@naver.com"
        type="email"
      />

      <PasswordInput placeholder="비밀번호를 입력해주세요" />
      <PasswordInput
        label="비밀번호 확인"
        isError
        errorMessage="비밀번호가 일치하지 않습니다."
      />
    </div>
  );
}
