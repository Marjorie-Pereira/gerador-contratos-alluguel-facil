import { defineConfig } from "cypress";
import fs from "node:fs";
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        deleteFile(filePath: string) {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }

          return null;
        },
      });

      return config;
    },
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
  },
});
