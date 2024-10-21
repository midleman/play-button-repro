import { _electron, test, expect } from "@playwright/test";

// Run test with "Debug Test" play button - test runs w/o issue
// Run test with "Run Test" play button - test fails - unable to launch Electron

test("basic electron test", async () => {
  const electronApp = await _electron.launch({ args: ["main.js"] });
  const window = await electronApp.firstWindow();

  await window.goto("https://playwright.dev/");
  await expect(window).toHaveTitle(/Playwright/);
  await window.click("text=Get Started");
  await expect(window).toHaveTitle(/Installation/);

  await electronApp.close();
});
