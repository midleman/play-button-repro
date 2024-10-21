import { _electron, test, expect } from "@playwright/test";

test("basic electron test", async ({ trace }) => {
  const electronApp = await _electron.launch({ args: ["main.js"] });
  const window = await electronApp.firstWindow();

  await window.goto("https://playwright.dev/");
  await expect(window).toHaveTitle(/Playwright/);
  await window.click("text=Get Started");
  await expect(window).toHaveTitle(/Installation/);

  await electronApp.close();
});
