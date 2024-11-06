import { expect, test } from "../../../pageObjects/page.fixture";

test.describe("login page", () => {
  test.beforeEach(async ({ PageObjects }) => {
    await PageObjects.LoginPage.open();
  });

  test("snapshot", async ({ PageObjects }) => {
    await expect(PageObjects.LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
