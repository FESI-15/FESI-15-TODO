"use client";

import {
  TextInput,
  PasswordInput,
  SearchInput,
  FileUploadInput,
} from "@/components/common/input";

export default function Home() {
  return (
    <div>
      {/* 라벨 작성 (id 꼭 같이 지정), 외부 커스텀 */}
      <TextInput
        id="signup-name"
        label="이름"
        placeholder="이름을 입력해주세요"
        fieldClassName="w-[600px]"
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
        id="password"
        label="비밀번호 확인"
        isError
        errorMessage="비밀번호가 일치하지 않습니다."
      />

      <SearchInput placeholder="할 일을 검색해주세요" />

      <FileUploadInput
        onFileChange={(file) => {
          console.log("선택된 파일:", file);
        }}
      />
    </div>
  );
}
