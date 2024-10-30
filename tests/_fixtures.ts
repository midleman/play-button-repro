import * as playwright from "@playwright/test";
const { test: base, expect: playwrightExpect } = playwright;

export const test = base.extend<
  {
    autoTestFixtures: void;
  },
  {
    suiteId: string;
    app: any;
  }
>({
  suiteId: ["not specified", { scope: "worker", option: true }],

  app: [
    async ({ suiteId }, use) => {
      const electronApp = await playwright._electron.launch({
        args: ["main.js"],
      });
      const app = await electronApp.firstWindow();
      await use(app);
      await electronApp.close();
    },
    { scope: "worker", auto: true },
  ],

  autoTestFixtures: [
    async ({}, use, testInfo) => {
      console.log(`worker ${testInfo.workerIndex}`, "-", testInfo.title);
      await use();
    },
    { scope: "test", auto: true },
  ],
});

export { playwrightExpect as expect };
