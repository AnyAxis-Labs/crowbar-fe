import { defineConfig } from "orval";

export default defineConfig({
  api: {
    output: {
      mode: "split",
      target: "src/services/queries.ts",
      schemas: "src/services/models",
      client: "react-query",
      prettier: true,
      override: {
        mutator: {
          path: "src/services/custom-client.ts",
          name: "customClient",
        },
      },
    },
    input: {
      target: "http://api-sonic-dev.nysm.work/swagger/json",
    },
  },
});
