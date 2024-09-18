import { expect, test } from "../../../pageObjects/page.fixture";

// eslint-disable-next-line playwright/no-skipped-test
test.describe.skip("login page @S0d7f103b", () => {
  test.beforeEach(async ({ PageObjects }) => {
    await PageObjects.LoginPage.open();
  });

  test("snapshot @Tac8fbec4", async ({ PageObjects }) => {
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
