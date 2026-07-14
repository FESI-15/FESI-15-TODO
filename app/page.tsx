"use client";

import {
  TextInput,
  PasswordInput,
  SearchInput,
  FileUploadInput,
  ImageUploadInput,
  TagInput,
  DateInput,
} from "@/components/common/input";
import { Pagination } from "@/components/common/Pagination";
import { useState } from "react";

const TOTAL_PAGES = 10;

export default function Home() {
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  // 태그 인풋
  const [tags, setTags] = useState<string[]>(["코딩", "자기계발", "공부"]);
  // 날짜 인풋
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={setCurrentPage}
      />
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
        id="file"
        label="파일 업로드"
        onFileChange={(file) => {
          console.log("선택된 파일:", file);
        }}
      />
      <DateInput
        date={date}
        onDateChange={setDate}
        label="마감기한"
        id="deadline"
      />
      <ImageUploadInput
        id="image"
        label="이미지 첨부"
        onFileChange={(file) => {
          console.log("선택된 파일:", file);
        }}
      />
      <ImageUploadInput
        inputSize="mobile"
        onFileChange={(file) => {
          console.log("선택된 파일:", file);
        }}
      />
      <TagInput tags={tags} onTagsChange={setTags} label="태그" id="tags" />
    </div>
  );
}
