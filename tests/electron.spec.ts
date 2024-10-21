import { _electron, test, expect } from "@playwright/test";

test("should toggle checkbox", async ({ trace }) => {
  const electronApp = await _electron.launch({ args: ["main.js"] });

  // Get the first window that the app opens, wait if necessary.
  const window = await electronApp.firstWindow();

  await window.goto("https://playwright.dev/");
  await expect(window).toHaveTitle(/Playwright/);
  await window.click("text=Get Started");
  await expect(window).toHaveTitle(/Installation/);

  // Exit app.
  await electronApp.close();
});
