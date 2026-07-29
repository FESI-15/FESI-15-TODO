import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    // next/jest의 기본 .svg 매핑(fileMock.js, 객체 반환)을 덮어써서
    // .svg를 렌더링 가능한 컴포넌트로 처리한다.
    "^.+\\.(svg)$": "<rootDir>/test/mocks/svgMock.tsx",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
};

export default createJestConfig(config);
