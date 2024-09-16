import { expect, test } from "../../../pageObjects/page.fixture";

test.describe("login page", () => {
  test.beforeEach(async ({ LoginPage }) => {
    await LoginPage.open();
  });

  test("snapshot", async ({ LoginPage }) => {
    await expect(LoginPage.page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
