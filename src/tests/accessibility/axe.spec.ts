import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../pageObjects/page.fixture";

// https://playwright.dev/docs/accessibility-testing
// This are set to be skipped because they are failing miserably on this demo site
// eslint-disable-next-line playwright/no-skipped-test
test.describe.skip("Accessibility Scans", () => {
  // more fail just skip
  test.describe.configure({ retries: 0 });

  test("login page a11y", async ({ page, PageObjects }) => {
    await PageObjects.LoginPage.open();
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
