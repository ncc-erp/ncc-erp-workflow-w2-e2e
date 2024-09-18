import { expect, test } from "../../../pageObjects/page.fixture";

// eslint-disable-next-line playwright/no-skipped-test
test.describe.skip("login page", () => {
  test.beforeEach(async ({ PageObjects }) => {
    await PageObjects.LoginPage.open();
  });

  test("snapshot", async ({ PageObjects }) => {
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
