import { expect, test } from "../../../pageObjects/page.fixture";

// eslint-disable-next-line playwright/no-skipped-test
test.describe.skip("login page @S4e2152fc", () => {
  test.beforeEach(async ({ PageObjects }) => {
    await PageObjects.LoginPage.open();
  });

  test("snapshot @T20fec06e", async ({ PageObjects }) => {
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
