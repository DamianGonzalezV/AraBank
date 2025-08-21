import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportWidth: 800,
    viewportHeight: 1600,
    baseUrl: "http://localhost:6001/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
