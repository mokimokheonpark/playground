import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  testTimeout: 20000,
  moduleNameMapper: {
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
