import { _electron, test, expect } from "@playwright/test";

test("basic electron test", async () => {
  // launch the app
  const electronApp = await _electron.launch({
    args: ["main.js"],
  });
  const window = await electronApp.firstWindow();

  // start tracing
  await window
    .context()
    .tracing.start({ name: "ETracing", screenshots: true, snapshots: true });

  // do test
  await window.goto("https://playwright.dev/");
  await expect(window).toHaveTitle(/Playwright/);
  await window.click("text=Get Started");
  await expect(window).toHaveTitle(/Installation/);

  // stop tracing
  const path = test.info().outputPath("electron-trace.zip");
  await window.context().tracing.stop({ path });
  test
    .info()
    .attachments.push({ name: "trace", path, contentType: "application/zip" });

  // close the app
  await electronApp.close();
});
