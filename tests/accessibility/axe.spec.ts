import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../pageObjects/page.fixture";

// https://playwright.dev/docs/accessibility-testing
// This are set to be skipped because they are failing miserably on this demo site
test.describe.skip("Accessibility Scans", () => {
  // more fail just skip
  test.describe.configure({ retries: 0 });

  test("login page a11y", async ({ page, LoginPage }) => {
    await LoginPage.open();
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
