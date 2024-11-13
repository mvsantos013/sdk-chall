/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/src/posts/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
  setupFiles: ["src/tests/setup-tests.ts"],
};
