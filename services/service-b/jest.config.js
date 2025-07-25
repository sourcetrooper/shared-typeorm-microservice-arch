const { createDefaultPreset } = require("ts-jest");
const tsJestTransformCfg = createDefaultPreset().transform;
/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },

  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"],
  passWithNoTests: true,
};