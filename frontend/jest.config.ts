import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "clover"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/dist/",
    "/coverage/",
  ],
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "!app/**/*.d.ts",
    "!app/**/node_modules/**",
    "!app/**/.next/**",
    "!app/favicon.ico",
    "!app/globals.css",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};

export default createJestConfig(config);
