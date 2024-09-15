import { expect, test } from "../../pageObjects/page.fixture";

test.describe("login page visual-test", () => {
  test.beforeEach(async ({ LoginPage }) => {
    await LoginPage.open();
  });

  test("snapshot", async ({ LoginPage }) => {
    await expect(LoginPage.page).toHaveScreenshot({
      fullPage: true,
      maxDiffPixelRatio: 0.2,
    });
  });
});
