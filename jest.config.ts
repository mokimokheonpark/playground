import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  testTimeout: 10000,
  moduleNameMapper: {
    "^@/auth$": "<rootDir>/auth",
    "^next-auth/react$": "<rootDir>/node_modules/next-auth/react",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
