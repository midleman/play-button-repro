import { test } from "../_fixtures";

// To see example of workers restarting per spec run with:
// npx playwright test --grep "fixture" --workers 1

test.use({
  suiteId: "suite 1", // as long as this changes from previous test, a new worker will start
});

test.describe("fixture test 1", () => {
  const testCases = ["1a", "1b", "1c"];
  testCases.forEach((testCase) => {
    test(`test ${testCase}`, async ({ app }) => {
      console.log(process.pid);
    });
  });
});

test.describe("fixture test 1", () => {
  test("test 1d", async ({ app }) => {
    console.log(process.pid);
  });
});
