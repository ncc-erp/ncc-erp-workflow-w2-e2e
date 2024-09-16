import { BrowserContext, chromium, test } from "@playwright/test";
import findFreePorts from "find-free-ports";
import { playAudit } from "playwright-lighthouse";

// todo refactor more support for authenticated pages
const pagePaths = {
  home: "",
  //   login: "login",
  // authenticated pages
};

let browser: BrowserContext;
let port: number;

test.beforeAll(async () => {
  // open chromium with remote debugging port for lighthouse
  [port] = await findFreePorts(1);
  browser = await chromium.launchPersistentContext("", {
    args: [`--remote-debugging-port=${port}`],
    // default lighthouse desktop resolution
    viewport: { width: 1350, height: 940 },
  });
});

for (const [pageName, pagePath] of Object.entries(pagePaths)) {
  // eslint-disable-next-line playwright/no-skipped-test
  test.skip(`${pageName} @lighthouse`, async ({ baseURL }) => {
    // take times, pending implementation
    const page = await browser.newPage();
    const fullUrl = baseURL + pagePath;
    await page.goto(fullUrl);
    await playAudit({
      page: page,
      thresholds: {
        // todo config global
        performance: 50,
        accessibility: 50,
        "best-practices": 50,
        seo: 50,
        pwa: 20,
      },
      port: port,
    });
  });
}

test.afterAll(async () => {
  await browser.close();
});
