import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
import os from "os";
import path from "path";
import { cucumberReporter, defineBddConfig } from "playwright-bdd";
dotenv.config({ path: path.resolve(__dirname, ".env") });

const cpuCores = os.cpus().length; // Get the number of CPU cores
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 300_000, // should remove
  testDir: "./src/tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? cpuCores : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["list"],
    ["@estruyf/github-actions-reporter"],
    ["html", { open: "never" }],
    [
      "@testomatio/reporter/lib/adapter/playwright.js",
      {
        apiKey: process.env.TESTOMATIO,
      },
    ],
    ["json", { outputFile: "results.json" }],
    cucumberReporter("html", { outputFile: "cucumber-report/report.html" }),
    // ["allure-playwright"]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    /* Set custom id attribute */
    testIdAttribute: "data-testid",
    /* Retain video on failure */
    video: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
      // teardown: "cleanup",
    },
    // {
    //   name: "cleanup",
    //   testMatch: /.*\.teardown\.ts/,
    // },
    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"], viewport: { width: 1920, height: 1080 } },
    //   dependencies: ["setup"],
    // },
    {
      name: "chromium",
      testDir: defineBddConfig({
        features: "src/features/**/*.feature",
        steps: ["src/features/steps/*.ts", "src/pageObjects/page.fixture.ts"],
      }),
      use: { ...devices["Desktop Chrome"], viewport: { width: 1920, height: 1080 } },
      dependencies: ["setup"],
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
