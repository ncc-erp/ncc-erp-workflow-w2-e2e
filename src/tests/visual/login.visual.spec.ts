import { expect, test } from "../../pageObjects/page.fixture";

test.describe("login page", () => {
  test.beforeEach(async ({ PageObjects }) => {
    await PageObjects.LoginPage.open();
  });

  const viewports = [
    { width: 1920, height: 1080 },
    { width: 375, height: 667 },
    { width: 768, height: 1024 },
    { width: 1356, height: 960 },
  ];

  viewports.forEach(({ width, height }) => {
    test(`snapshot for ${width}x${height} viewport`, async ({ PageObjects }) => {
      // Set viewport size
      await PageObjects.LoginPage.page.setViewportSize({ width, height });

      // Capture screenshot for the given viewport
      await expect(PageObjects.LoginPage.page).toHaveScreenshot({
        fullPage: true,
      });
    });
  });
});
