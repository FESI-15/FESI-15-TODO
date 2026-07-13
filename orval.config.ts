// orval.config.ts
import { defineConfig } from "orval";

export default defineConfig({
  slidTodoApi: {
    input: {
      target: "https://slid-to-do-api.vercel.app/openapi.json",
    },
    output: {
      target: "./apis/generated/slidTodoApi.ts",
      schemas: "./apis/generated/model",
      client: "react-query",
      httpClient: "axios",
      mode: "tags-split",
      clean: true,
      override: {
        mutator: {
          path: "./apis/axiosInstance.ts",
          name: "customInstance",
        },
      },
    },
  },
});
