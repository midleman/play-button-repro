import { test, expect } from "../_fixtures";

// To see example of workers restarting per spec run with:
// npx playwright test --grep "fixture" --workers 1

test.use({
  suiteId: "suite 2", // as long as this changes from previous test, a new worker will start
});

test.describe("fixture test", () => {
  const testCases = ["2a", "2b", "2c"];
  testCases.forEach((testCase) => {
    test(`test ${testCase}`, async ({ app }) => {
      console.log(process.pid);
    });
  });
});
