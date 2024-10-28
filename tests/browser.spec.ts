import { _electron, test, expect, chromium } from "@playwright/test";

test("basic browser test", async () => {
  const browser = await chromium.launch({
    headless: false,
    timeout: 0,
  });
  const page = await browser.newPage();

  // start tracing
  await page.context().tracing.start({
    screenshots: true,
    snapshots: true,
  });

  // do test
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(/Playwright/);
  await page.click("text=Get Started");
  await expect(page).toHaveTitle(/Installation/);

  //   stop tracing
  const path = test.info().outputPath("browser-trace.zip");
  await page.context().tracing.stop({ path });
  test
    .info()
    .attachments.push({ name: "trace", path, contentType: "application/zip" });

  // close the app
  await browser.close();
});
